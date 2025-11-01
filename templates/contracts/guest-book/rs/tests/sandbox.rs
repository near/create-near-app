use near_sdk::near;
use serde_json::json;
use near_workspaces::types::{NearToken, AccountId};

#[tokio::test]
async fn test_guestbook_contract() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;

    let alice_account = sandbox.dev_create_account().await?;
    let bob_account = sandbox.dev_create_account().await?;

    let alice_outcome = alice_account
        .call(contract.id(), "add_message")
        .args_json(json!({"text": "Hello World!"}))
        .deposit(NearToken::from_near(0))
        .transact()
        .await?;

    assert!(alice_outcome.is_success());

    let bob_outcome = bob_account
        .call(contract.id(), "add_message")
        .args_json(json!({"text": "Hello Near!"}))
        .deposit(NearToken::from_near(1))
        .transact()
        .await?;

    assert!(bob_outcome.is_success());

    #[derive(Debug, PartialEq)]
    #[near(serializers = [json])]
    struct PostedMessage {
         premium: bool,
         sender: AccountId,
         text: String,
    }

    let messages_vec: Vec<PostedMessage> = contract.view("get_messages").args_json(json!({})).await?.json()?;

    assert_eq!(messages_vec, vec![
        PostedMessage {
            premium: false,
            sender: alice_account.id().clone(),
            text: "Hello World!".to_string(),
        },
        PostedMessage {
            premium: true,
            sender: bob_account.id().clone(),
            text: "Hello Near!".to_string(),
        },
    ]);

    Ok(())
}
