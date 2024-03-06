import styles from '../app/app.module.css'

export const HelloNearCard = () => {
  return (
    <a href="/hello-near" className={styles.card} rel="noopener noreferrer">
      <h2>
        Near Integration <span>-&gt;</span>
      </h2>
      <p>Discover how simple it is to interact with a Near smart contract.</p>
    </a>
  )
}

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
  )
}
