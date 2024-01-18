import styles from "../styles/app.module.css";

export const DocsCard = () => {
  return (
    <a
      href="https://docs.near.org/develop/integrate/quickstart-frontend"
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2>
        Near Docs <span>-&gt;</span>
      </h2>
      <p>Learn how this application works, and what you can build on Near.</p>
    </a>
  );
};

export const HelloNearCard = () => {
  return (
    <a href="/hello-near" className={styles.card} rel="noopener noreferrer">
      <h2>
        Near Integration <span>-&gt;</span>
      </h2>
      <p>Discover how simple it is to interact with a Near smart contract.</p>
    </a>
  );
};

export const HelloComponentsCard = () => {
  return (
    <a
      href="/hello-components"
      className={styles.card}
      rel="noopener noreferrer"
    >
      <h2>
        Web3 Components <span>-&gt;</span>
      </h2>
      <p>See how Web3 components can help you to create multi-chain apps.</p>
    </a>
  );
};
