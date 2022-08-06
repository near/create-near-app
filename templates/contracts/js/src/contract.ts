import { NearBindgen, NearContract, near, call, view } from 'near-sdk-js';

// The @NearBindgen decorator allows this code to compile to Base64.
@NearBindgen
class MyContract extends NearContract {
  greeting: string;

  constructor({message="Hello"}:{message: string}) {
    //execute the NEAR Contract's constructor
    super();
    this.greeting = message;
  }

  default(){ return new MyContract({message: "Hello"}) }

  // @call indicates that this is a 'change method' or a function
  // that changes state on the blockchain. Change methods cost gas.
  // For more info -> https://docs.near.org/docs/concepts/gas
  @call
  set_greeting({ message }: { message: string }): void {
    near.log(`Saving greeting ${message}`);
    this.greeting = message;
  }

  // @view indicates a 'view method' or a function that returns
  // the current values stored on the blockchain. View calls are free
  // and do not cost gas.
  @view
  get_greeting(): string {
    near.log(`The current greeting is ${this.greeting}`);
    return this.greeting;
  }
}
