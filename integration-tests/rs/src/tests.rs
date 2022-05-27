use near_units::parse_near;
use serde_json::json;
use workspaces::prelude::*;
use workspaces::{network::Sandbox, Account, Contract, Worker};

const WASM_FILEPATH: &str = "../../out/main.wasm";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(WASM_FILEPATH)?;
    let contract = worker.dev_deploy(&wasm).await?;

    // create accounts
    let owner = worker.root_account();
    let alice = owner
        .create_subaccount(&worker, "alice")
        .initial_balance(parse_near!("30 N"))
        .transact()
        .await?
        .into_result()?;

    // begin tests
    test_default_message(&alice, &contract, &worker).await?;
    test_changes_message(&alice, &contract, &worker).await?;
    Ok(())
}

async fn test_default_message(
    user: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    let message: String = user
        .call(&worker, contract.id(), "get_greeting")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(message, "Hello".to_string());
    println!("      Passed ✅ gets default message");
    Ok(())
}

async fn test_changes_message(
    user: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    user.call(&worker, contract.id(), "set_greeting")
        .args_json(json!({"message": "Howdy"}))?
        .transact()
        .await?;

    let message: String = user
        .call(&worker, contract.id(), "get_greeting")
        .args_json(json!({}))?
        .transact()
        .await?
        .json()?;

    assert_eq!(message, "Howdy".to_string());
    println!("      Passed ✅ changes message");
    Ok(())
}