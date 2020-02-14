/*
 * This is an example of a Rust smart contract that greets the account that calls it.
 * Since account id's on NEAR human-readable, this contract might return "Hello near-friend"
 * The two functions "set_greeting" and "welcome" change state and return state.
 * Methods that access state are included in the "viewMethods" array in main.js
 * Similarly, methods that change state are included in the "changeMethods" array.
 *
*/

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use borsh::{BorshDeserialize, BorshSerialize};
use near_bindgen::{env, near_bindgen};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// Rust now allows for changing how memory is obtained, and wee_alloc is lightweight 
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[derive(Serialize, Deserialize)]
pub struct TextMessage {
    text: String
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    records: HashMap<String, String>,
}

#[near_bindgen]
impl Welcome {
    pub fn set_greeting(&mut self, message: String) {
        // We can use env:: to access context from the blockchain transaction
        let account_id = env::signer_account_id();
        self.records.insert(account_id, message);
    }

    // For users unfamiliar with Rust, this function is essentially returning our struct TextMessage defined above
    // "match" is a control flow operator and "None" comes from the enum Option
    // For more info on this: https://doc.rust-lang.org/book/ch06-02-match.html#matching-with-optiont
    pub fn welcome(&self, account_id: String) -> TextMessage {
        match self.records.get(&account_id) {
            None => {
                // when logging, prefix strings with byte string literal "b" constructing a u8 array
                env::log(b"Using default message.");
                return TextMessage { text: format!("Hello {}", account_id) }
            },
            _ => return TextMessage { text: format!("{} {}", self.records.get(&account_id).unwrap(), account_id) }
        }
    }
}

// the rest of this file involves testing
#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_bindgen::MockedBlockchain;
    use near_bindgen::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
        }
    }

    #[test]
    fn set_get_message() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Welcome::default();
        contract.set_greeting("howdy".to_string());
        // the contract's welcome function will return a struct with one field: "text"
        // assert that "howdy bob_near" is equal to the "text" field's value
        assert_eq!("howdy bob_near".to_string(), contract.welcome("bob_near".to_string()).text);
    }

    #[test]
    fn get_nonexistent_message() {
        let context = get_context(vec![], true);
        testing_env!(context);
        let contract = Welcome::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!("Hello francis.near".to_string(), contract.welcome("francis.near".to_string()).text);
    }
}
