import styles from '@/styles/app.module.css'
import { Link, useLocation } from 'react-router'

export const Cards = () => {
  const onHelloNear = useLocation().pathname === '/hello-near'

  return (
    <div className={styles.grid}>
      <a
        href="https://docs.near.org/web3-apps/quickstart"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Near Docs <span>-&gt;</span>
        </h2>
        <p>Learn how this application works, and what you can build on Near.</p>
      </a>

      {onHelloNear ? (
        <Link to="/" className={styles.card}>
          <h2>
            Home <span>-&gt;</span>
          </h2>
          <p>Go back to the home page.</p>
        </Link>
      ) : (
        <Link to="/hello-near" className={styles.card}>
          <h2>
            Near Integration <span>-&gt;</span>
          </h2>
          <p>Discover how simple it is to interact with a Near smart contract.</p>
        </Link>
      )}
    </div>
  )
}
