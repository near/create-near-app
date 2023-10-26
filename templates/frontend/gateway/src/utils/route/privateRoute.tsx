import { useAuthStore } from '@/stores/auth';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';

const privateRoute = (Component: NextComponentType) => {
  const Private = (props: any) => {
    const signedIn = useAuthStore((store) => store.signedIn);
    const router = useRouter();

    if (!signedIn && router) {
      // `signin` or `signup`?
      router.push('/signup');
    }
    return <Component {...props} />;
  };

  return Private;
};

export default privateRoute;
