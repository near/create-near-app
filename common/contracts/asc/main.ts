// smart contract source code, written in AssemblyScript
// for more info: https://docs.near.org/docs/roles/developer/contracts/assemblyscript

import { context, storage } from "near-sdk-as";

const DEFAULT_MESSAGE = "Hello"

export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  storage.set(context.sender, message);
}
