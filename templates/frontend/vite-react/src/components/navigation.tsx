import { Link } from 'react-router'
import NearLogo from '@/assets/near-logo.svg';
import styles from '@/styles/app.module.css';
import { useNearWallet } from 'near-connect-hooks';

export const Navigation = () => {
 const { signedAccountId, loading, signIn, signOut } = useNearWallet();

  const handleAction = () => {
    if (signedAccountId) {
      signOut();
    } else {
      signIn();
    }
  };

  const label = loading
    ? "Loading..."
    : signedAccountId
    ? `Logout ${signedAccountId}`
    : "Login";

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
          <button className="btn btn-secondary" onClick={handleAction}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
