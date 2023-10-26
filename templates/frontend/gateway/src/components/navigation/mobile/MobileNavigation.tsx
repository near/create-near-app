import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useAuthStore } from '@/stores/auth';

import NearIcon from '../icons/near-icon.svg';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { Menu } from './Menu';

const Wrapper = styled.div`
  --nav-height: 72px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
`;

const Navigation = styled.div`
  height: var(--nav-height);
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: white;
  box-shadow: 0 1px 0 var(--sand6);
  position: relative;
  z-index: 10005;
`;

const Logo = styled.a`
  text-decoration: none;
  cursor: pointer;
  outline: none;
  margin-right: auto;
  transition: all 200ms;
  border-radius: 4px;

  &:focus {
    outline: 2px solid var(--violet4);
    outline-offset: 0.3rem;
  }

  img {
    height: 32px;
    width: 32px;
  }
`;

const MenuButton = styled.button`
  all: unset;
  display: flex;
  width: 32px;
  height: 100%;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
  color: var(--sand12);

  i {
    font-size: 32px;
    line-height: 32px;
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
  z-index: 10;
  gap: 10px;
`;

export const MobileNavigation = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const signedIn = useAuthStore((store) => store.signedIn);
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);

  const closeMenu = () => {
    setMenuIsVisible(false);
  };

  const openMenu = () => {
    setMenuIsVisible(true);
  };

  const toggleMenu = () => {
    if (menuIsVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <Wrapper>
      <Navigation>
        <Link href="/" passHref legacyBehavior>
          <Logo onClick={closeMenu}>
            <Image src={NearIcon} alt="NEAR" />
          </Logo>
        </Link>

        <Actions onClick={closeMenu}>
          {signedIn ? (
            <>
              <UserDropdownMenu />
            </>
          ) : (
            <Button label="Login" variant="primary" onClick={requestSignInWithWallet} />
          )}
        </Actions>

        <MenuButton aria-label="Menu" onClick={toggleMenu}>
          {menuIsVisible ? <i className="ph ph-x" /> : <i className="ph ph-list" />}
        </MenuButton>
      </Navigation>

      <Menu isVisible={menuIsVisible} onCloseMenu={closeMenu} />
    </Wrapper>
  );
};
