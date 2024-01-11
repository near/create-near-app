import Image from "next/image";
import styles from "@/styles/app.module.css";
import {
  DocsCard,
  HelloComponentsCard,
  HelloNearCard,
} from "@/components/cards";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}> </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/near.svg"
          alt="Next.js Logo"
          width={110 * 1.5}
          height={28 * 1.5}
          priority
        />
        <h3 className="ms-2 me-3 text-dark"> + </h3>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={300 * 0.58}
          height={61 * 0.58}
          priority
        />
      </div>

      <div className={styles.grid}>
        <HelloComponentsCard />
        <HelloNearCard />
        <DocsCard />
      </div>
    </main>
  );
}
