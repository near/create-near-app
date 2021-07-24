/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, log, near_bindgen, AccountId};

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    records: LookupMap<AccountId, String>,
}

impl Default for Welcome {
    fn default() -> Self {
        Self {
            records: LookupMap::new(b"a"),
        }
    }
}

#[near_bindgen]
impl Welcome {
    pub fn set_greeting(&mut self, message: String) {
        let account_id = env::signer_account_id();

        // Use `env::log_str` or `near_sdk::log!` to record logs permanently to the blockchain!
        log!("Saving greeting '{}' for account '{}'", message, account_id);

        self.records.insert(&account_id, &message);
    }

    pub fn get_greeting(&self, account_id: AccountId) -> String {
        self.records.get(&account_id).unwrap_or_else(|| "Hello".to_string())
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{test_utils::VMContextBuilder, testing_env};

    #[test]
    fn set_then_get_greeting() {
        let mut contract = Welcome::default();
        contract.set_greeting("howdy".to_string());

        // The testing environment is initialized by default, so can just retrieve the signer
        // account id using `env`, which is also available in tests.
        assert_eq!(
            "howdy".to_string(),
            contract.get_greeting(env::signer_account_id())
        );
    }

    #[test]
    fn get_default_greeting() {
        let contract = Welcome::default();

        // Here we create a custom context to indicate that the following transaction is read-only
        let context = VMContextBuilder::default().is_view(true).build();
        testing_env!(context);

        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(
            "Hello".to_string(),
            contract.get_greeting("francis.near".parse().unwrap())
        );
    }
}
