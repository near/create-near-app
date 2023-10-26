import { isPassKeyAvailable } from '@near-js/biometric-ed25519';
import { useEffect } from 'react';

import { openToast } from '@/components/lib/Toast';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  const signedIn = useAuthStore((store) => store.signedIn);

  useEffect(() => {
    if (signedIn) {
      isPassKeyAvailable().then((passKeyAvailable: boolean) => {
        if (!passKeyAvailable) {
          openToast({
            title: 'Limited Functionality',
            type: 'WARNING',
            description: 'To access all account features, try using a browser that supports passkeys',
            duration: 5000,
          });
        }
      });
    }
  }, [signedIn]);

  return (
    <div className="container mx-auto">
      <h1 className="mt-5 text-center"> Your Gateway to an Open Web </h1>
      <h3 className="text-center"> Welcome to your NEAR Gateway </h3>
      
      <p className="mt-5">
        A gateway is a simple web app that can be augmented with <span className="red"> NEAR Components</span>.
        This Gateway is built using `Next.js` and readily allows users to login
        using FastAuth.
      </p>

      <h5 className="mt-5"> Configure your Gateway </h5>
      <ul>
        <li> Select the network <code>mainnet</code> or <code>testnet</code> in the <code> ./src/utils/config.ts </code> </li>
        <li> Modify the navigation menu in <code>./src/components/navigation/navigation-categories.ts</code> </li>
        <li> Create new pages by adding files in <code>./src/pages</code> </li>
        <li> Define general components in <code>./src/data/components.ts</code> to use them across pages </li>
      </ul>
    </div>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
