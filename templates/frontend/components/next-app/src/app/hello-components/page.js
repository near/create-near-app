import dynamic from 'next/dynamic';

import styles from '@/app/app.module.css';
import { Cards } from '@/components/cards';
import { Components } from '@/config';

const Component = dynamic(() => import('@/components/vm'), {
  ssr: false,
  loading: () => <p>Loading Component...</p>,
});


export default function HelloComponents() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Loading components from: &nbsp;
            <code className={styles.code}>{Components.socialDB}</code>
          </p>
        </div>
        <div className={styles.center}>
          <h1>
            <code>Multi-chain</code> Components Made Simple
          </h1>
        </div>
        <div className="row">
          <div className="col-6">
            <Component src={Components.HelloNear} />
            <p className="my-4">&nbsp;</p>
            <Component src={Components.LoveNear} />
          </div>
          <div className="col-6">
            <Component src={Components.Lido} />
          </div>
        </div>
        <hr />

        <div className={styles.grid}>
          <Cards />
        </div>
      </main>
    </>
  );
}
