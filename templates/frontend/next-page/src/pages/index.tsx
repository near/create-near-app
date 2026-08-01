import Image from "next/image";

import NearLogo from "../../public/near.svg";
import NextLogo from "../../public/next.svg";
import { Cards } from "@/components/cards";
import styles from "@/styles/app.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={NearLogo}
          alt="NEAR Logo"
          width={165}
          height={42}
          priority
        />
        <h3 className="ms-2 me-3 text-dark"> + </h3>
        <Image
          className={styles.logo}
          src={NextLogo}
          alt="Next.js Logo"
          width={174}
          height={35}
          style={{ width: 174, height: 'auto' }}
          priority
        />
      </div>

      <Cards />
    </main>
  );
}
