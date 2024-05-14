import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';
import NearLogo from '/public/near-logo.svg';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <Image priority src={NearLogo} alt="NEAR" width="30" height="24" className="d-inline-block align-text-top" />
        </Link>
        <div className='navbar-nav pt-1'>
          <button className="btn btn-secondary" onClick={action} > {label} </button>
        </div>
      </div>
    </nav>
  );
};