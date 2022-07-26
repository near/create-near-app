import { NearBindgen, NearContract, call, view } from 'near-sdk-js';

// The @NearBindgen decorator allows this code to compile to Base64.
@NearBindgen
class MyContract extends NearContract {
  constructor() {
    //execute the NEAR Contract's constructor
    super();
    this.my_greeting = 'Hello';
  }

  // @call indicates that this is a 'change method' or a function
  // that changes state on the blockchain. Change methods cost gas.
  // For more info -> https://docs.near.org/docs/concepts/gas
  @call
  set_greeting({ message }) {   
    env.log(`Saving greeting ${message}`);
    this.my_greeting = message;
  }

  // @view indicates a 'view method' or a function that returns
  // the current values stored on the blockchain. View calls are free
  // and do not cost gas.
  @view
  get_greeting() {
    env.log(`The current greeting is ${this.my_greeting}`);
    return this.my_greeting;
  }
}
