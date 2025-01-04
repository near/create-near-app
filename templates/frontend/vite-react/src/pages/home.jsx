import styles from '@/styles/app.module.css';
import NearLogo from '@/assets/near-logo.svg';
import NextLogo from '@/assets/react.svg';
import { Cards } from '@/components/cards';

const Home = () => {
  return (

    <main className={styles.main}>
    <div className={styles.description}> </div>

    <div className={styles.center}>
      <img className={styles.logo} src={NearLogo} alt="NEAR Logo" width={110 * 1.5} height={28 * 1.5} />
      <h3 className="ms-2 me-3 text-dark"> + </h3>
      <img
          className={styles.reactLogo}
          src={NextLogo}
          alt="React Logo"
          width={300 * 0.58}
          height={61 * 0.58}
        />
    </div>

    <div className={styles.grid}>
      <Cards />
    </div>
  </main>
  )
}

export default Home
