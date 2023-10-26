import React from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useAuthStore } from '@/stores/auth';

import { AccordionMenu } from './AccordionMenu';

type Props = {
  isVisible: boolean;
  onCloseMenu: () => void;
};

const Wrapper = styled.div<{
  visible: boolean;
}>`
  position: fixed;
  top: var(--nav-height);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: ${(p) => (p.visible ? 'block' : 'none')};
  transition: 200ms;
  background: var(--white);
  border-top: 1px solid var(--sand6);
  overflow: auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  transform-origin: center top;
  animation: fadeIn 200ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1, 0);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-height: calc(100% + 1px);

  /*
    The +1px for "min-height" allows "overscroll-behavior: contain;" on the <Wrapper>
    to prevent the <body> from scrolling. Setting "overflow: hidden;" on the <body> would
    break the "position: sticky;" behavior of the navigation - that's why we need to
    use this hack instead.

    https://stackoverflow.com/a/48954092
  */
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function Menu(props: Props) {
  const signedIn = useAuthStore((store) => store.signedIn);
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);

  return (
    <Wrapper visible={props.isVisible}>
      <InnerWrapper>

        <AccordionMenu onCloseMenu={props.onCloseMenu} />

        {!signedIn && (
          <Actions>
            <Button label="Sign in" variant="secondary" size="large" onClick={requestSignInWithWallet} />
          </Actions>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}
