import Image from 'next/image';
import Link from 'next/link';
import { useNearWallet } from 'near-connect-hooks';

import NearLogo from '../../public/near-logo.svg';

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
        <Link href="/">
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width={30}
            height={24}
            className="d-inline-block align-text-top"
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