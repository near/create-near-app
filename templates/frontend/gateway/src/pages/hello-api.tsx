import { useEffect, useState } from 'react';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import type { NextPageWithLayout } from '@/utils/types';

// Contract that the app will interact with
const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_NAME || '';

const callMethod = async (near: any, contractId: string, methodName: string, args: any = {}, gas = '30000000000000', deposit = 0) => {
  const selector = await near.selector;
  const wallet = await selector.wallet();

  wallet.signAndSendTransaction({
    signerId: near.accountId,
    receiverId: contractId,
    actions: [
      {
        type: 'FunctionCall',
        params: { methodName, args, gas, deposit },
      },
    ],
  });
};

// Make a read-only call to retrieve information from the network
const viewMethod = async (near: any, contractId: string, methodName: string, args = {}) => {
  const provider = await near.nearConnection.connection.provider;

  const res = await provider.query({
    request_type: 'call_function',
    account_id: contractId,
    method_name: methodName,
    args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
    finality: 'optimistic',
  });
  return JSON.parse(Buffer.from(res.result).toString());
};

const ExampleAPIPage: NextPageWithLayout = () => {
  const { signedIn } = useAuthStore(store => store);
  const near = useVmStore(store => store.near);
  const [greeting, setStateGreeting] = useState('');


  useEffect(() => {
    if (near) {
      viewMethod(near, CONTRACT, 'get_greeting')
        .then(
          res => setStateGreeting(res)
        );
    }
  }, [near]);

  const setGreeting = async () => {
    callMethod(near, CONTRACT, 'set_greeting', { greeting });
  };

  // Define components
  const greetingForm = (
    <>
      <div className="border border-black p-3">
        <label>Update greeting: </label>
        <input className="w-50 mx-2" placeholder="Howdy" onChange={(e) => setStateGreeting(e.target.value)} />
        <button className="btn btn-primary" onClick={setGreeting}>
          Save
        </button>
      </div>
    </>
  );

  const notLoggedInWarning = (
    <p className="text-center py-2"> Please login to change the greeting </p>
  );

  return <>
    <p className="text-center mt-3 p-3"> This example makes calls directly from the Gateway app using the <code>near-api-js</code> and <code>wallet-selector</code> libraries </p>

    <div className="container border mt-2 border-warning p-3">

      <h3 className="text-center">
        The contract says:
        <span className="text-decoration-underline"> {greeting} </span>
      </h3>

      <p className='pt-4 pb-2'>
        Look at that! A greeting stored on <b>{CONTRACT}</b>.
      </p>

      <p>
        <b> Note </b>: The contract address is being loaded from
        an <code> env </code> variable. If you chose to add a contract during
        the wizard, running <code> npm run deploy </code> will deploy the
        contract code and update the <code> env </code> variable used here.
      </p>

      {signedIn ? greetingForm : notLoggedInWarning}
    </div>
  </>;
};

ExampleAPIPage.getLayout = useDefaultLayout;

export default ExampleAPIPage;
