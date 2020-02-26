/*
 * This AssemblyScript smart contract welcomes an account.
 * Since account ids on NEAR are human-readable, it may return the value, "Welcome, near_friend" 
 * This smart contract only has one function "welcome" that returns a value
 * There are no mutators or setters in this example.
 * If there were a function that changed state, it would appear in the array "changeMethods" in index.js
 * Note that the function "welcome" is added to the array "viewMethods" in that same file
 */

import { logging } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const NAME = ". Welcome to NEAR Protocol chain";

export function welcome(account_id: string): TextMessage {
  // Logging can be seen on the NEAR Explorer (https://explorer.nearprotocol.com/)
  // It is also returned to the caller
  logging.log("simple welcome test");
  let message = new TextMessage();
  const s = printString(NAME);
  message.text = "Welcome, " + account_id + s;
  return message;
}

// demonstrates a simple function called by a smart contract 
function printString(s: string): string {
  return s;
}