use chrono::Utc;
use contract_rs::Bid;
use near_sdk::{json_types::U128, NearToken};
use near_sdk::{AccountId, Gas};
use near_workspaces::result::ExecutionFinalResult;
use near_workspaces::{Account, Contract};
use serde_json::json;

const TEN_NEAR: NearToken = NearToken::from_near(10);
const FT_WASM_FILEPATH: &str = "./tests/fungible_token.wasm";
const NFT_WASM_FILEPATH: &str = "./tests/non_fungible_token.wasm";

#[tokio::test]

async fn test_contract_is_operational() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;

    let ft_wasm = std::fs::read(FT_WASM_FILEPATH)?;
    let ft_contract = sandbox.dev_deploy(&ft_wasm).await?;

    let nft_wasm = std::fs::read(NFT_WASM_FILEPATH)?;
    let nft_contract = sandbox.dev_deploy(&nft_wasm).await?;

    let root: near_workspaces::Account = sandbox.root_account()?;

    // Initialize FT contract
    let res = ft_contract
        .call("new_default_meta")
        .args_json(serde_json::json!({
            "owner_id": root.id(),
            "total_supply": U128(1_000_000),
        }))
        .transact()
        .await?;

    assert!(res.is_success());

    // Initialize NFT contract
    let res = nft_contract
        .call("new_default_meta")
        .args_json(serde_json::json!({"owner_id": root.id()}))
        .transact()
        .await?;

    assert!(res.is_success());

    // Create accounts
    let alice = create_subaccount(&root, "alice").await?;
    let bob = create_subaccount(&root, "bob").await?;
    let auctioneer = create_subaccount(&root, "auctioneer").await?;
    let contract_account = create_subaccount(&root, "contract").await?;

    // Mint NFT
    let request_payload = json!({
        "token_id": "1",
        "receiver_id": contract_account.id(),
        "metadata": {
            "title": "LEEROYYYMMMJENKINSSS",
            "description": "Alright time's up, let's do this.",
            "media": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1"
        },
    });

    let res = contract_account
        .call(nft_contract.id(), "nft_mint")
        .args_json(request_payload)
        .deposit(NearToken::from_millinear(80))
        .transact()
        .await?;

    assert!(res.is_success());

    // Deploy and initialize auction contract
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = contract_account.deploy(&contract_wasm).await?.unwrap();

    let now = Utc::now().timestamp();
    let a_minute_from_now = (now + 60) * 1000000000;
    let starting_price = U128(10_000);

    let init: ExecutionFinalResult = contract
        .call("init")
        .args_json(
            json!({"end_time": a_minute_from_now.to_string(),"auctioneer": auctioneer.id(),"ft_contract": ft_contract.id(),"nft_contract":nft_contract.id(),"token_id":"1", "starting_price":starting_price }),
        )
        .transact()
        .await?;

    assert!(init.is_success());

    // Register accounts
    for account in [
        alice.clone(),
        bob.clone(),
        contract_account.clone(),
        auctioneer.clone(),
    ]
    .iter()
    {
        let register = account
            .call(ft_contract.id(), "storage_deposit")
            .args_json(serde_json::json!({ "account_id": account.id() }))
            .deposit(NearToken::from_yoctonear(8000000000000000000000))
            .transact()
            .await?;

        assert!(register.is_success());
    }

    // Transfer FTs
    let transfer_amount = U128(150_000);

    let root_transfer_alice =
        ft_transfer(&root, alice.clone(), ft_contract.clone(), transfer_amount).await?;
    assert!(root_transfer_alice.is_success());

    let alice_balance: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance, U128(150_000));

    let root_transfer_bob =
        ft_transfer(&root, bob.clone(), ft_contract.clone(), transfer_amount).await?;
    assert!(root_transfer_bob.is_success());

    let bob_balance: U128 = ft_balance_of(&ft_contract, bob.id()).await?;
    assert_eq!(bob_balance, U128(150_000));

    // Alice makes bid less than starting price
    let alice_bid = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(5_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(10_000));
    assert_eq!(highest_bid_alice.bidder, *contract.id());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(0));

    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(150_000));

    // Alice makes valid bid
    let alice_bid = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(50_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(50_000));
    assert_eq!(highest_bid_alice.bidder, *alice.id());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(50_000));

    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(100_000));

    // Bob makes a higher bid
    let bob_bid = ft_transfer_call(
        bob.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(60_000),
    )
    .await?;

    assert!(bob_bid.is_success());

    let highest_bid: Bid = contract.view("get_highest_bid").await?.json()?;

    assert_eq!(highest_bid.bid, U128(60_000));
    assert_eq!(highest_bid.bidder, *bob.id());

    // Checks Alice was returned her bid
    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(150_000));
    let bob_balance_after_bid: U128 = ft_balance_of(&ft_contract, bob.id()).await?;
    assert_eq!(bob_balance_after_bid, U128(90_000));

    // Alice tries to make a bid with less FTs than the previous
    let alice_bid: ExecutionFinalResult = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(50_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(60_000));
    assert_eq!(highest_bid_alice.bidder, *bob.id());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(60_000));

    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(150_000));

    // Auctioneer claims auction but did not finish
    let auctioneer_claim: ExecutionFinalResult =
        claim(auctioneer.clone(), contract_account.id()).await?;

    assert!(auctioneer_claim.is_failure());

    // Fast forward 200 blocks
    let blocks_to_advance = 200;
    sandbox.fast_forward(blocks_to_advance).await?;

    // Auctioneer claims auction
    let auctioneer_claim: ExecutionFinalResult =
        claim(auctioneer.clone(), contract_account.id()).await?;

    assert!(auctioneer_claim.is_success());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(0));

    let auctioneer_balance_after_claim: U128 = ft_balance_of(&ft_contract, auctioneer.id()).await?;
    assert_eq!(auctioneer_balance_after_claim, U128(60_000));

    // Check highest bidder received the NFT
    let token_info: serde_json::Value = nft_contract
        .call("nft_token")
        .args_json(json!({"token_id": "1"}))
        .transact()
        .await?
        .json()
        .unwrap();
    let owner_id: String = token_info["owner_id"].as_str().unwrap().to_string();

    assert_eq!(
        owner_id,
        bob.id().to_string(),
        "token owner is not the highest bidder"
    );

    // Auctioneer claims auction back but fails
    let auctioneer_claim: ExecutionFinalResult =
        claim(auctioneer.clone(), contract_account.id()).await?;

    assert!(auctioneer_claim.is_failure());

    // Alice tries to make a bid when the auction is over
    let alice_bid: ExecutionFinalResult = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(70_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(60_000));
    assert_eq!(highest_bid_alice.bidder, *bob.id());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(0));

    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(150_000));
    let bob_balance_after_bid: U128 = ft_balance_of(&ft_contract, bob.id()).await?;
    assert_eq!(bob_balance_after_bid, U128(90_000));

    Ok(())
}

async fn create_subaccount(
    root: &near_workspaces::Account,
    name: &str,
) -> Result<near_workspaces::Account, Box<dyn std::error::Error>> {
    let subaccount = root
        .create_subaccount(name)
        .initial_balance(TEN_NEAR)
        .transact()
        .await?
        .unwrap();

    Ok(subaccount)
}

async fn ft_transfer(
    root: &near_workspaces::Account,
    account: Account,
    ft_contract: Contract,
    transfer_amount: U128,
) -> Result<ExecutionFinalResult, Box<dyn std::error::Error>> {
    let transfer = root
        .call(ft_contract.id(), "ft_transfer")
        .args_json(serde_json::json!({
            "receiver_id": account.id(),
            "amount": transfer_amount
        }))
        .deposit(NearToken::from_yoctonear(1))
        .transact()
        .await?;
    Ok(transfer)
}

async fn ft_balance_of(
    ft_contract: &Contract,
    account_id: &AccountId,
) -> Result<U128, Box<dyn std::error::Error>> {
    let result = ft_contract
        .view("ft_balance_of")
        .args_json(json!({"account_id": account_id}))
        .await?
        .json()?;

    Ok(result)
}

async fn ft_transfer_call(
    account: Account,
    ft_contract_id: &AccountId,
    receiver_id: &AccountId,
    amount: U128,
) -> Result<ExecutionFinalResult, Box<dyn std::error::Error>> {
    let transfer = account
        .call(ft_contract_id, "ft_transfer_call")
        .args_json(serde_json::json!({
            "receiver_id": receiver_id, "amount":amount, "msg": "0" }))
        .deposit(NearToken::from_yoctonear(1))
        .gas(Gas::from_tgas(300))
        .transact()
        .await?;
    Ok(transfer)
}

async fn claim(
    account: Account,
    contract_id: &AccountId,
) -> Result<ExecutionFinalResult, Box<dyn std::error::Error>> {
    let claim: ExecutionFinalResult = account
        .call(contract_id, "claim")
        .args_json(json!({}))
        .gas(Gas::from_tgas(300))
        .transact()
        .await?;
    Ok(claim)
}
