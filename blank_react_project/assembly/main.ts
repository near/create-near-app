import { near, context, storage, logging, base58, base64, PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math } from "near-runtime-ts";
// import { u128 } from "bignum";
// import { TextMessage } from "./model";

const NAME = ". Welcome to NEAR Protocol chain"

export function hello(name: string): string {
  logging.log("hello test");
  const s = printString(NAME);
  return "Hello, " + name + s;
}

export function printString(s: string): string {
  return s;
}