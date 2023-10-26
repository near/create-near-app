import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useAuthStore } from '@/stores/auth';

import NearLogo from '../icons/near-icon.svg';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { MainNavigationMenu } from './MainNavigationMenu';

const Wrapper = styled.div<{
  scrolled?: boolean;
}>`
  --nav-height: 75px;
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: var(--nav-height);
  box-shadow: 0 1px 0 var(--sand6);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.a`
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition: all 200ms;
  border-radius: 4px;

  &:focus {
    outline: 2px solid var(--violet4);
    outline-offset: 0.3rem;
  }

  img {
    width: 110px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
  z-index: 10;
  gap: 0.5rem;
`;

export const DesktopNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const signedIn = useAuthStore((store) => store.signedIn);
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>

      <Wrapper scrolled={scrolled}>
        <Container className="container-xl">
          <Link href="/" passHref legacyBehavior>
            <Logo>
              <Image priority src={NearLogo} alt="NEAR" />
            </Logo>
          </Link>

          <MainNavigationMenu />

          <Actions>
            {signedIn ? (
              <>
                <UserDropdownMenu />
              </>
            ) : (
              <>
                <Button label="Sign In" variant="secondary" onClick={requestSignInWithWallet} />
              </>
            )}
          </Actions>
        </Container>
      </Wrapper>
    </>
  );
};
