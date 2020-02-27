import { context, logging, storage } from "near-runtime-ts";
// available class: near, context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const DEFAULT_MESSAGE = "Hello"

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage();
  let greetingPrefix = storage.get<String>(account_id);
  if (!greetingPrefix) {
    greetingPrefix = DEFAULT_MESSAGE;
  }
  const s = printString(account_id);
  message.text = greetingPrefix + " " + s;
  return message;
}

export function setGreeting(message: string): void {
  storage.set<String>(context.sender, message);
}

function printString(s: string): string {
  return s;
}