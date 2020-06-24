import { context, logging, storage } from "near-sdk-as";
// available class: context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const DEFAULT_MESSAGE = "Hello"

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage();
  let greetingPrefix = storage.get<string>(account_id);
  if (!greetingPrefix) {
    greetingPrefix = DEFAULT_MESSAGE;
  }
  const s = printString(account_id);
  message.text = greetingPrefix + " " + s;
  return message;
}

export function setGreeting(message: string): void {
  storage.set(context.sender, message);
}

function printString(s: string): string {
  return s;
}