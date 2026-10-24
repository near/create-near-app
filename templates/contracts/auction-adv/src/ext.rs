// Find all our documentation at https://docs.near.org
use near_sdk::json_types::U128;
use near_sdk::{ext_contract, AccountId};

use crate::TokenId;

// FT interface for cross-contract calls
#[ext_contract(ft_contract)]
#[allow(dead_code)]
trait FT {
    fn ft_transfer(&self, receiver_id: AccountId, amount: U128);
}

// NFT interface for cross-contract calls
#[ext_contract(nft_contract)]
#[allow(dead_code)]
trait NFT {
    fn nft_transfer(&self, receiver_id: AccountId, token_id: TokenId);
}
