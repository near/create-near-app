import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import NearLogo from '@/assets/near-logo.svg';
import styles from '@/styles/app.module.css';
import { useWalletSelector } from '@near-wallet-selector/react-hook';

interface WalletSelectorHook {
  signedAccountId: string | null;
  signIn: () => void;
  signOut: () => void;
}

export const Navigation = () => {
  const { signedAccountId, signIn, signOut } = useWalletSelector() as WalletSelectorHook;

  const [action, setAction] = useState<() => void>(() => () => {});
  const [label, setLabel] = useState<string>('Loading...');

  useEffect(() => {
    if (signedAccountId) {
      setAction(() => signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => signIn);
      setLabel('Login');
    }
  }, [signedAccountId, signIn, signOut]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={NearLogo}
            alt="NEAR"
            width={30}
            height={24}
            className={styles.logo}
          />
        </Link>
        <div className="navbar-nav pt-1">
          <button className="btn btn-secondary" onClick={action}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
