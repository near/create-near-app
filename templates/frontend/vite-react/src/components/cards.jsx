import styles from '@/styles/app.module.css';
import { Link } from 'react-router';

export const Cards = () => {
  return (
    <div className={styles.grid}>
      <a
        href="https://docs.near.org/build/web3-apps/quickstart"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Near Docs <span>-&gt;</span>
        </h2>
        <p>Learn how this application works, and what you can build on Near.</p>
      </a>

      <Link to="/hello-near" className={styles.card} rel="noopener noreferrer">
        <h2>
          Near Integration <span>-&gt;</span>
        </h2>
        <p>Discover how simple it is to interact with a Near smart contract.</p>
      </Link>
    </div>
  );
};
