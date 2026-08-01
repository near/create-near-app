import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '@/styles/app.module.css';

export const Cards = () => {
  const onHelloNear = useRouter().pathname === '/hello-near';

  return (
    <div className={styles.grid}>
      <Link
        href="https://docs.near.org/web3-apps/quickstart"
        className={styles.card}
        target='_blank'
        rel="noopener noreferrer"
      >
        <h2>
          Near Docs <span>-&gt;</span>
        </h2>
        <p>Learn how this application works, and what you can build on Near.</p>
      </Link>

      {onHelloNear ? (
        <Link href="/" className={styles.card}>
          <h2>
            Home <span>-&gt;</span>
          </h2>
          <p>Go back to the home page.</p>
        </Link>
      ) : (
        <Link href="/hello-near" className={styles.card}>
          <h2>
            Near Integration <span>-&gt;</span>
          </h2>
          <p>Discover how simple it is to interact with a Near smart contract.</p>
        </Link>
      )}
    </div>
  );
};
