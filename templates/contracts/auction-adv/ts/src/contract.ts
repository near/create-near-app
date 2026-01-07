// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, AccountId, NearPromise, initialize, assert } from "near-sdk-js";

class Bid {
  bidder: AccountId;
  bid: bigint;
}

const THIRTY_TGAS = BigInt("30000000000000");
const NO_DEPOSIT = BigInt(0);

@NearBindgen({ requireInit: true })
class AuctionContract {
  highest_bid: Bid = { bidder: '', bid: BigInt(1) };
  auction_end_time: bigint = BigInt(0);
  auctioneer: AccountId = "";
  claimed: boolean = false;
  ft_contract: AccountId = "";
  nft_contract: AccountId = "";
  token_id: string = "";

  @initialize({ privateFunction: true })
  init({ end_time, auctioneer, ft_contract, nft_contract, token_id, starting_price }: { end_time: bigint, auctioneer: AccountId, ft_contract: AccountId, nft_contract: AccountId, token_id: string, starting_price: bigint }) {
    this.auction_end_time = end_time;
    this.highest_bid = { bidder: near.currentAccountId(), bid: starting_price };
    this.auctioneer = auctioneer;
    this.ft_contract = ft_contract;
    this.nft_contract = nft_contract;
    this.token_id = token_id;
  }

  @call({})
  ft_on_transfer({ sender_id, amount, msg }: { sender_id: AccountId, amount: bigint, msg: String }) {

    const previous = { ...this.highest_bid };

    assert(this.auction_end_time > near.blockTimestamp(), "Auction has ended");
    assert(near.predecessorAccountId() == this.ft_contract, "The token is not supported");
    assert(BigInt(amount) >= BigInt(previous.bid), "You must place a higher bid");
    this.highest_bid = {
      bidder: sender_id,
      bid: amount,
    };

    return NearPromise.new(this.ft_contract)
      .functionCall("ft_transfer", JSON.stringify({ receiver_id: previous.bidder, amount: previous.bid }), BigInt(1), THIRTY_TGAS)
      .then(
        NearPromise.new(near.currentAccountId())
          .functionCall("ft_transfer_callback", JSON.stringify({}), NO_DEPOSIT, THIRTY_TGAS)
      )
      .asReturn()
  }

  @call({})
  claim() {
    assert(this.auction_end_time <= near.blockTimestamp(), "Auction has not ended yet");
    assert(!this.claimed, "Auction has been claimed");

    this.claimed = true;

    return NearPromise.new(this.nft_contract)
      .functionCall("nft_transfer", JSON.stringify({ receiver_id: this.highest_bid.bidder, token_id: this.token_id }), BigInt(1), THIRTY_TGAS)
      .then(NearPromise.new(this.ft_contract)
      .functionCall("ft_transfer", JSON.stringify({ receiver_id: this.auctioneer, amount: this.highest_bid.bid }), BigInt(1), THIRTY_TGAS))
      .asReturn()
  }

  @call({ privateFunction: true })
  ft_transfer_callback({ }): BigInt {
    return BigInt(0);
  }

  @view({})
  get_highest_bid(): Bid {
    return this.highest_bid;
  }

  @view({})
  get_auction_end_time(): BigInt {
    return this.auction_end_time;
  }

  @view({})
  get_auction_info(): AuctionContract {
    return this;
  }
}