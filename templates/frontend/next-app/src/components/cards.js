import Link from 'next/link';

import styles from '../app/app.module.css';

export const DocsCard = () => {
  return (
    <Link
      href="https://docs.near.org/build/web3-apps/quickstart"
      className={styles.card}
      target='_blank'
      rel="noopener noreferrer"
    >
      <h2>
        Near Docs <span>-&gt;</span>
      </h2>
      <p>Learn how this application works, and what you can build on Near.</p>
    </Link>);
};

export const HelloNearCard = () => {
  return (
    <Link
      href="/hello-near"
      className={styles.card}
      rel="noopener noreferrer"
    >
      <h2>
        Near Integration <span>-&gt;</span>
      </h2>
      <p>Discover how simple it is to interact with a Near smart contract.</p>
    </Link>
  );
};

export const HelloComponentsCard = () => {
  return (
    <Link
      href="/hello-components"
      className={styles.card}
      rel="noopener noreferrer"
    >
      <h2>
        Web3 Components <span>-&gt;</span>
      </h2>
      <p>See how Web3 components can help you to create multi-chain apps.</p>
    </Link>
  );
};