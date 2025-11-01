import { near } from "near-sdk-js";

export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
  static schema = {
    'premium': 'boolean',
    'sender': 'string',
    'text': 'string',
  }

  premium: boolean;
  sender: string;
  text: string;

  constructor(premium: boolean, sender: string, text: string) {
    this.premium = premium;
    this.sender = sender;
    this.text = text;
  }
}