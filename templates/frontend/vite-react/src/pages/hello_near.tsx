import { useEffect, useState, ChangeEvent } from 'react';
import { Cards } from '@/components/cards';
import styles from '@/styles/app.module.css';

import { HelloNearContract } from '@/config';
import { useNearWallet } from 'near-connect-hooks';

interface useNearHook {
  signedAccountId: string | null;
  viewFunction: (params: { contractId: string; method: string; args?: Record<string, unknown> }) => Promise<any>;
  callFunction: (params: { contractId: string; method: string; args?: Record<string, unknown> }) => Promise<any>;
}

// Contract constant
const CONTRACT = HelloNearContract as string;

export default function HelloNear() {
  const { signedAccountId, viewFunction, callFunction } = useNearWallet() as useNearHook;

  const [greeting, setGreeting] = useState<string>('loading...');
  const [newGreeting, setNewGreeting] = useState<string>('loading...');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    viewFunction({ contractId: CONTRACT, method: 'get_greeting' })
      .then((greeting) => setGreeting(greeting))
      .catch(console.error);
  }, [viewFunction]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const saveGreeting = async () => {
    try {
      await callFunction({
        contractId: CONTRACT,
        method: 'set_greeting',
        args: { greeting: newGreeting },
      });
    } catch (error) {
      console.error(error);
      const greeting = await viewFunction({ contractId: CONTRACT, method: 'get_greeting' });
      setGreeting(greeting);
    }

    setShowSpinner(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setGreeting(newGreeting);
    setShowSpinner(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGreeting(e.target.value);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{CONTRACT}</code>
        </p>
      </div>
      <div className={styles.center}>
        <h1 className="w-100">
          The contract says: <code>{greeting}</code>
        </h1>

        {loggedIn ? (
          <div className="input-group">
            <input
              type="text"
              className="form-control w-20"
              placeholder="Store a new greeting"
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" onClick={saveGreeting}>
                <span hidden={showSpinner}>Save</span>
                <i className="spinner-border spinner-border-sm" hidden={!showSpinner}></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-100 text-end align-text-center">
            <p className="m-0">Please login to change the greeting</p>
          </div>
        )}
      </div>
      <Cards />
    </main>
  );
}
