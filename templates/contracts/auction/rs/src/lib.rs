// Find all our documentation at https://docs.near.org
use near_sdk::json_types::{U128, U64};
use near_sdk::{env, near, require, AccountId, Gas, NearToken, PanicOnDefault};

pub mod ext;
pub use crate::ext::*;

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Bid {
    pub bidder: AccountId,
    pub bid: U128,
}

pub type TokenId = String;

#[near(contract_state, serializers = [json, borsh])]
#[derive(PanicOnDefault)]
pub struct Contract {
    highest_bid: Bid,
    auction_end_time: U64,
    auctioneer: AccountId,
    claimed: bool,
    ft_contract: AccountId,
    nft_contract: AccountId,
    token_id: TokenId,
}

#[near]
impl Contract {
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(
        end_time: U64,
        auctioneer: AccountId,
        ft_contract: AccountId,
        nft_contract: AccountId,
        token_id: TokenId,
        starting_price: U128,
    ) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: starting_price,
            },
            auction_end_time: end_time,
            auctioneer,
            claimed: false,
            ft_contract,
            nft_contract,
            token_id,
        }
    }

    // Users bid by transferring FT tokens
    pub fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> U128 {
        require!(
            env::block_timestamp() < self.auction_end_time.into(),
            "Auction has ended"
        );

        let ft = env::predecessor_account_id();
        require!(ft == self.ft_contract, "The token is not supported");

        // Last bid
        let Bid {
            bidder: last_bidder,
            bid: last_bid,
        } = self.highest_bid.clone();

        // Check if the deposit is higher than the current bid
        require!(amount > last_bid, "You must place a higher bid");

        // Update the highest bid
        self.highest_bid = Bid {
            bidder: sender_id,
            bid: amount,
        };

        // Transfer FTs back to the last bidder
        ft_contract::ext(self.ft_contract.clone())
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .with_static_gas(Gas::from_tgas(30))
            .ft_transfer(last_bidder, last_bid);

        U128(0)
    }

    pub fn claim(&mut self) {
        require!(
            env::block_timestamp() > self.auction_end_time.into(),
            "Auction has not ended yet"
        );

        require!(!self.claimed, "Auction has been claimed");

        self.claimed = true;

        // Transfer FTs to the auctioneer
        ft_contract::ext(self.ft_contract.clone())
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .with_static_gas(Gas::from_tgas(30))
            .ft_transfer(self.auctioneer.clone(), self.highest_bid.bid);

        // Transfer the NFT to the highest bidder
        nft_contract::ext(self.nft_contract.clone())
            .with_static_gas(Gas::from_tgas(30))
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .nft_transfer(self.highest_bid.bidder.clone(), self.token_id.clone());
    }

    pub fn get_highest_bid(&self) -> Bid {
        self.highest_bid.clone()
    }

    pub fn get_auction_end_time(&self) -> U64 {
        self.auction_end_time
    }

    pub fn get_auction_info(&self) -> &Contract {
        self
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn init_contract() {
        let end_time: U64 = U64::from(1000);
        let alice: AccountId = "alice.near".parse().unwrap();
        let ft_contract: AccountId = "ft.near".parse().unwrap();
        let nft_contract: AccountId = "nft.near".parse().unwrap();
        let token_id: TokenId = "1".to_string();
        let starting_price: U128 = U128(100);
        let contract = Contract::init(
            end_time.clone(),
            alice.clone(),
            ft_contract.clone(),
            nft_contract.clone(),
            token_id.clone(),
            starting_price.clone(),
        );

        let default_bid = contract.get_highest_bid();
        assert_eq!(default_bid.bidder, env::current_account_id());
        assert_eq!(default_bid.bid, starting_price);

        let auction_info = contract.get_auction_info();
        assert_eq!(auction_info.auction_end_time, end_time);
        assert_eq!(auction_info.auctioneer, alice);
        assert_eq!(auction_info.ft_contract, ft_contract);
        assert_eq!(auction_info.nft_contract, nft_contract);
        assert_eq!(auction_info.token_id, token_id);
        assert_eq!(auction_info.claimed, false);
    }
}
