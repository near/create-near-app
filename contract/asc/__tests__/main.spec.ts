import { setGreeting } from '../main';
import { storage, context } from "near-sdk-as";

describe("Greeting ", () => {
    it("should be set and read", () => {
        setGreeting("hello world");
        const greeting = storage.get<string>(context.sender);
    });
});
