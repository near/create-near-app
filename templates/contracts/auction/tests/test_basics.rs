use near_api::{AccountId, NearGas, NearToken};
use near_sdk::serde_json::json;

#[derive(near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Bid {
    pub bidder: AccountId,
    pub bid: NearToken,
}

#[tokio::test]
async fn test_contract_is_operational() -> testresult::TestResult<()> {
    // Build the contract wasm file
    let contract_wasm_path = cargo_near_build::build_with_cli(Default::default())?;
    let contract_wasm = std::fs::read(contract_wasm_path)?;

    // Initialize the sandbox
    let sandbox = near_sandbox::Sandbox::start_sandbox().await?;
    let sandbox_network =
        near_api::NetworkConfig::from_rpc_url("sandbox", sandbox.rpc_addr.parse()?);

    // Create accounts
    let alice = create_subaccount(&sandbox, "alice.sandbox").await?;
    let bob = create_subaccount(&sandbox, "bob.sandbox").await?;
    let auctioneer = create_subaccount(&sandbox, "auctioneer.sandbox").await?;
    let contract = create_subaccount(&sandbox, "contract.sandbox")
        .await?
        .as_contract();

    // Initialize signer for the contract deployment
    let signer = near_api::Signer::from_secret_key(
        near_sandbox::config::DEFAULT_GENESIS_ACCOUNT_PRIVATE_KEY
            .parse()
            .unwrap(),
    )?;

    // Calculate the end time for the auction as a parameter for the init function
    let now = near_api::Chain::block()
        .fetch_from(&sandbox_network)
        .await?
        .header
        .timestamp_nanosec
        .parse::<u64>()?;
    let a_minute_from_now = now + 60_000_000_000;

    // Deploy the contract with the init call
    near_api::Contract::deploy(contract.account_id().clone())
        .use_code(contract_wasm)
        .with_init_call(
            "init",
            json!({"end_time": a_minute_from_now.to_string(), "auctioneer": auctioneer.account_id()}),
        )?
        .with_signer(signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Alice makes first bid
    contract
        .call_function("bid", ())
        .transaction()
        .deposit(NearToken::from_near(1))
        .with_signer(alice.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // For now, the highest bid is the Alice's bid
    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, NearToken::from_near(1));
    assert_eq!(&highest_bid.bidder, alice.account_id());

    let alice_balance = alice
        .tokens()
        .near_balance()
        .fetch_from(&sandbox_network)
        .await?
        .total;

    // Now, Bob makes a higher bid
    contract
        .call_function("bid", ())
        .transaction()
        .deposit(NearToken::from_near(2))
        .with_signer(bob.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Now, the highest bid is the Bob's bid
    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, NearToken::from_near(2));
    assert_eq!(&highest_bid.bidder, bob.account_id());

    // Check that Alice was refunded her bid
    let new_alice_balance = alice
        .tokens()
        .near_balance()
        .fetch_from(&sandbox_network)
        .await?
        .total;
    assert!(new_alice_balance == alice_balance.saturating_add(NearToken::from_near(1)));

    // Alice tries to make a bid with less NEAR than the previous
    contract
        .call_function("bid", ())
        .transaction()
        .deposit(NearToken::from_near(1))
        .with_signer(alice.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    // Auctioneer claims auction but did not finish
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(30))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    // Fast forward 200 blocks
    let blocks_to_advance = 200;
    sandbox.fast_forward(blocks_to_advance).await?;

    // Auctioneer claims the auction
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(30))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Checks the auctioneer has the correct balance
    let auctioneer_balance = auctioneer
        .tokens()
        .near_balance()
        .fetch_from(&sandbox_network)
        .await?
        .total;
    assert!(auctioneer_balance <= NearToken::from_near(12));
    assert!(auctioneer_balance > NearToken::from_millinear(11990));

    // Auctioneer tries to claim the auction again
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(30))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    // Alice tries to make a bid when the auction is over
    contract
        .call_function("bid", ())
        .transaction()
        .deposit(NearToken::from_near(1))
        .with_signer(alice.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    Ok(())
}

async fn create_subaccount(
    sandbox: &near_sandbox::Sandbox,
    name: &str,
) -> testresult::TestResult<near_api::Account> {
    let account_id: AccountId = name.parse().unwrap();
    sandbox
        .create_account(account_id.clone())
        .initial_balance(NearToken::from_near(10))
        .send()
        .await?;
    Ok(near_api::Account(account_id))
}
