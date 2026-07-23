import styles from '@/styles/app.module.css';
import NearLogo from '@/assets/near-logo.svg';
import ReactLogo from '@/assets/react.svg';
import { Cards } from '@/components/cards';

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}> </div>

      <div className={styles.center}>
        <img className={styles.logo} src={NearLogo} alt="NEAR Logo" width={165} height={42} />
        <h3 className="ms-2 me-3 text-dark"> + </h3>
        <img
          className={styles.reactLogo}
          src={ReactLogo}
          alt="React Logo"
          width={174}
          height={35}
        />
      </div>

      <Cards />
    </main>
  )
}

export default Home
