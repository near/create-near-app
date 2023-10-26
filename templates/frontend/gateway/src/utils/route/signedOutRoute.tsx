import { useRouter } from 'next/router';

import { useAuthStore } from '@/stores/auth';

import type { NextPageWithLayout } from '../types';

const signedOutRoute = (Component: NextPageWithLayout) => {
  const SignedOut = (props: NextPageWithLayout) => {
    const signedIn = useAuthStore((store) => store.signedIn);
    const router = useRouter();

    if (signedIn && router) {
      router.push('/');
    }
    return <Component {...props} />;
  };

  return SignedOut;
};

export default signedOutRoute;
