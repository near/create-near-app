use near_api::{AccountId, NearGas, NearToken};
use near_sdk::json_types::U128;
use near_sdk::serde_json;

const FT_WASM_FILEPATH: &str = "./tests/fungible_token.wasm";
const NFT_WASM_FILEPATH: &str = "./tests/non_fungible_token.wasm";

#[derive(near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Bid {
    pub bidder: AccountId,
    pub bid: U128,
}

#[tokio::test]
async fn test_contract_is_operational() -> testresult::TestResult<()> {
    let contract_wasm_path = cargo_near_build::build_with_cli(Default::default())?;
    let contract_wasm = std::fs::read(contract_wasm_path)?;

    let sandbox = near_sandbox::Sandbox::start_sandbox().await?;
    let sandbox_network =
        near_api::NetworkConfig::from_rpc_url("sandbox", sandbox.rpc_addr.parse()?);

    let signer = near_api::Signer::from_secret_key(
        near_sandbox::config::DEFAULT_GENESIS_ACCOUNT_PRIVATE_KEY
            .parse()
            .unwrap(),
    )?;

    let root: AccountId = "sandbox".parse().unwrap();

    // Create accounts
    let alice = create_subaccount(&sandbox, "alice.sandbox").await?;
    let bob = create_subaccount(&sandbox, "bob.sandbox").await?;
    let auctioneer = create_subaccount(&sandbox, "auctioneer.sandbox").await?;
    let contract_account = create_subaccount(&sandbox, "contract.sandbox").await?;
    let contract = contract_account.as_contract();

    // Deploy and initialize FT contract
    let ft_contract_account = create_subaccount(&sandbox, "ft.sandbox").await?;
    let ft_contract = ft_contract_account.as_contract();
    let ft_wasm = std::fs::read(FT_WASM_FILEPATH)?;

    near_api::Contract::deploy(ft_contract.account_id().clone())
        .use_code(ft_wasm)
        .with_init_call(
            "new_default_meta",
            serde_json::json!({"owner_id": root, "total_supply": U128(1_000_000)}),
        )?
        .with_signer(signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Deploy and initialize NFT contract
    let nft_contract_account = create_subaccount(&sandbox, "nft.sandbox").await?;
    let nft_contract = nft_contract_account.as_contract();
    let nft_wasm = std::fs::read(NFT_WASM_FILEPATH)?;

    near_api::Contract::deploy(nft_contract.account_id().clone())
        .use_code(nft_wasm)
        .with_init_call("new_default_meta", serde_json::json!({"owner_id": root}))?
        .with_signer(signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Mint NFT
    nft_contract
        .call_function(
            "nft_mint",
            serde_json::json!({
                "token_id": "1",
                "receiver_id": contract.account_id(),
                "token_metadata": {
                    "title": "LEEROYYYMMMJENKINSSS",
                    "description": "Alright time's up, let's do this.",
                    "media": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1"
                },
            }),
        )
        .transaction()
        .deposit(NearToken::from_millinear(80))
        .with_signer(root.clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Register accounts for FT
    for account_id in [
        alice.account_id().clone(),
        bob.account_id().clone(),
        contract.account_id().clone(),
        auctioneer.account_id().clone(),
    ]
    .iter()
    {
        ft_contract
            .call_function("storage_deposit", serde_json::json!({ "account_id": account_id }))
            .transaction()
            .deposit(NearToken::from_yoctonear(8000000000000000000000))
            .with_signer(account_id.clone(), signer.clone())
            .send_to(&sandbox_network)
            .await?
            .assert_success();
    }

    // Transfer FTs to Alice and Bob
    let transfer_amount = U128(150_000);

    ft_transfer(
        &ft_contract,
        &root,
        alice.account_id(),
        transfer_amount,
        &signer,
        &sandbox_network,
    )
    .await?;

    ft_transfer(
        &ft_contract,
        &root,
        bob.account_id(),
        transfer_amount,
        &signer,
        &sandbox_network,
    )
    .await?;

    // Deploy and initialize auction contract
    let now = std::time::SystemTime::now()
        .duration_since(std::time::SystemTime::UNIX_EPOCH)?
        .as_secs();
    let a_minute_from_now = (now + 60) * 1000000000;
    let starting_price = U128(10_000);

    near_api::Contract::deploy(contract.account_id().clone())
        .use_code(contract_wasm)
        .with_init_call(
            "init",
            serde_json::json!({
                "end_time": a_minute_from_now.to_string(),
                "auctioneer": auctioneer.account_id(),
                "ft_contract": ft_contract.account_id(),
                "nft_contract": nft_contract.account_id(),
                "token_id": "1",
                "starting_price": starting_price
            }),
        )?
        .with_signer(signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    // Alice makes bid less than starting price
    ft_transfer_call(
        &ft_contract,
        &alice,
        contract.account_id(),
        U128(5_000),
        &signer,
        &sandbox_network,
    )
    .await?;

    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, U128(10_000));
    assert_eq!(&highest_bid.bidder, contract.account_id());

    let contract_balance: U128 =
        ft_balance_of(&ft_contract, contract.account_id(), &sandbox_network).await?;
    assert_eq!(contract_balance, U128(0));

    let alice_balance: U128 =
        ft_balance_of(&ft_contract, alice.account_id(), &sandbox_network).await?;
    assert_eq!(alice_balance, U128(150_000));

    // Alice makes valid bid
    ft_transfer_call(
        &ft_contract,
        &alice,
        contract.account_id(),
        U128(50_000),
        &signer,
        &sandbox_network,
    )
    .await?;

    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, U128(50_000));
    assert_eq!(&highest_bid.bidder, alice.account_id());

    let contract_balance: U128 =
        ft_balance_of(&ft_contract, contract.account_id(), &sandbox_network).await?;
    assert_eq!(contract_balance, U128(50_000));

    let alice_balance: U128 =
        ft_balance_of(&ft_contract, alice.account_id(), &sandbox_network).await?;
    assert_eq!(alice_balance, U128(100_000));

    // Bob makes a higher bid
    ft_transfer_call(
        &ft_contract,
        &bob,
        contract.account_id(),
        U128(60_000),
        &signer,
        &sandbox_network,
    )
    .await?;

    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, U128(60_000));
    assert_eq!(&highest_bid.bidder, bob.account_id());

    // Checks Alice was returned her bid
    let alice_balance: U128 =
        ft_balance_of(&ft_contract, alice.account_id(), &sandbox_network).await?;
    assert_eq!(alice_balance, U128(150_000));

    let bob_balance: U128 =
        ft_balance_of(&ft_contract, bob.account_id(), &sandbox_network).await?;
    assert_eq!(bob_balance, U128(90_000));

    // Alice tries to make a bid with less FTs than the previous
    ft_transfer_call(
        &ft_contract,
        &alice,
        contract.account_id(),
        U128(50_000),
        &signer,
        &sandbox_network,
    )
    .await?;

    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, U128(60_000));
    assert_eq!(&highest_bid.bidder, bob.account_id());

    let contract_balance: U128 =
        ft_balance_of(&ft_contract, contract.account_id(), &sandbox_network).await?;
    assert_eq!(contract_balance, U128(60_000));

    let alice_balance: U128 =
        ft_balance_of(&ft_contract, alice.account_id(), &sandbox_network).await?;
    assert_eq!(alice_balance, U128(150_000));

    // Auctioneer claims auction but did not finish
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(300))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    // Fast forward 200 blocks
    let blocks_to_advance = 200;
    sandbox.fast_forward(blocks_to_advance).await?;

    // Auctioneer claims auction
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(300))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_success();

    let contract_balance: U128 =
        ft_balance_of(&ft_contract, contract.account_id(), &sandbox_network).await?;
    assert_eq!(contract_balance, U128(0));

    let auctioneer_balance: U128 =
        ft_balance_of(&ft_contract, auctioneer.account_id(), &sandbox_network).await?;
    assert_eq!(auctioneer_balance, U128(60_000));

    // Check highest bidder received the NFT
    let token_info: serde_json::Value = nft_contract
        .call_function("nft_token", serde_json::json!({"token_id": "1"}))
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    let owner_id: String = token_info["owner_id"].as_str().unwrap().to_string();

    assert_eq!(
        owner_id,
        bob.account_id().to_string(),
        "token owner is not the highest bidder"
    );

    // Auctioneer claims auction back but fails
    contract
        .call_function("claim", ())
        .transaction()
        .gas(NearGas::from_tgas(300))
        .with_signer(auctioneer.account_id().clone(), signer.clone())
        .send_to(&sandbox_network)
        .await?
        .assert_failure();

    // Alice tries to make a bid when the auction is over
    ft_transfer_call(
        &ft_contract,
        &alice,
        contract.account_id(),
        U128(70_000),
        &signer,
        &sandbox_network,
    )
    .await?;

    let highest_bid: Bid = contract
        .call_function("get_highest_bid", ())
        .read_only()
        .fetch_from(&sandbox_network)
        .await?
        .data;
    assert_eq!(highest_bid.bid, U128(60_000));
    assert_eq!(&highest_bid.bidder, bob.account_id());

    let contract_balance: U128 =
        ft_balance_of(&ft_contract, contract.account_id(), &sandbox_network).await?;
    assert_eq!(contract_balance, U128(0));

    let alice_balance: U128 =
        ft_balance_of(&ft_contract, alice.account_id(), &sandbox_network).await?;
    assert_eq!(alice_balance, U128(150_000));

    let bob_balance: U128 =
        ft_balance_of(&ft_contract, bob.account_id(), &sandbox_network).await?;
    assert_eq!(bob_balance, U128(90_000));

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

async fn ft_transfer(
    ft_contract: &near_api::Contract,
    from: &AccountId,
    to: &AccountId,
    amount: U128,
    signer: &std::sync::Arc<near_api::Signer>,
    network: &near_api::NetworkConfig,
) -> testresult::TestResult<()> {
    ft_contract
        .call_function(
            "ft_transfer",
            serde_json::json!({"receiver_id": to, "amount": amount}),
        )
        .transaction()
        .deposit(NearToken::from_yoctonear(1))
        .with_signer(from.clone(), signer.clone())
        .send_to(network)
        .await?
        .assert_success();
    Ok(())
}

async fn ft_balance_of(
    ft_contract: &near_api::Contract,
    account_id: &AccountId,
    network: &near_api::NetworkConfig,
) -> testresult::TestResult<U128> {
    let result: U128 = ft_contract
        .call_function("ft_balance_of", serde_json::json!({"account_id": account_id}))
        .read_only()
        .fetch_from(network)
        .await?
        .data;
    Ok(result)
}

async fn ft_transfer_call(
    ft_contract: &near_api::Contract,
    account: &near_api::Account,
    receiver_id: &AccountId,
    amount: U128,
    signer: &std::sync::Arc<near_api::Signer>,
    network: &near_api::NetworkConfig,
) -> testresult::TestResult<()> {
    let _ = ft_contract
        .call_function(
            "ft_transfer_call",
            serde_json::json!({"receiver_id": receiver_id, "amount": amount, "msg": "0"}),
        )
        .transaction()
        .deposit(NearToken::from_yoctonear(1))
        .gas(NearGas::from_tgas(300))
        .with_signer(account.account_id().clone(), signer.clone())
        .send_to(network)
        .await?;
    Ok(())
}
