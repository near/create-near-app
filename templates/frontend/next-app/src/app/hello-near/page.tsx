'use client';
import { Cards } from '@/components/cards';

import { useEffect, useState } from 'react';
import styles from '@/app/app.module.css';

import { HelloNearContract } from '@/config';

import { useNearWallet } from '@/providers/near-provider';

export default function HelloNear() {
  const { signedAccountId, viewFunction, callFunction } = useNearWallet();
  const [greeting, setGreeting] = useState<string>('loading...');
  const [newGreeting, setNewGreeting] = useState('');
  const loggedIn = !!signedAccountId;
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    viewFunction({ contractId: HelloNearContract, method: 'get_greeting' }).then((greeting) => setGreeting(String(greeting)))
      .catch((error: Error) => setError(error.message));
  }, [viewFunction]);

  const saveGreeting = async () => {
    setShowSpinner(true);
    setError('');
    try {
      await callFunction({ contractId: HelloNearContract, method: 'set_greeting', args: { greeting: newGreeting } });
      const updated = await viewFunction({ contractId: HelloNearContract, method: 'get_greeting' });
      setGreeting(String(updated));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to save greeting');
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{HelloNearContract}</code>
        </p>
      </div>

      <div className={styles.center}>
        <h1 className="w-100">
          The contract says: <code>{greeting}</code>
        </h1>
        <div className="input-group" hidden={!loggedIn}>
          <input
            type="text"
            className="form-control w-20"
            placeholder="Store a new greeting"
            onChange={(t) => setNewGreeting(t.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" disabled={showSpinner} onClick={saveGreeting}>
              <span hidden={showSpinner}> Save </span>
              <i className="spinner-border spinner-border-sm" hidden={!showSpinner}></i>
            </button>
          </div>
        </div>
        <div className="w-100 text-end align-text-center" hidden={loggedIn}>
          <p className="m-0"> Please login to change the greeting </p>
        </div>
      </div>
      {error && <p role="alert">{error}</p>}
      <Cards />
    </main>
  );
}
