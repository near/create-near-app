import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';

const Wrapper = styled.div`
  > button {
    all: unset;
    display: flex;
    align-items: center;
    border-radius: 50px;
    background-color: var(--sand12);
    padding: 4px;
    transition: all 200ms;

    &:hover {
      background-color: var(--black);
    }

    &:focus {
      box-shadow: 0 0 0 4px var(--violet4);
    }
  }
  .d-inline-block {
    width: unset !important;
    height: unset !important;
    img {
      border-radius: 50% !important;
      width: 38px !important;
      height: 38px !important;
    }
  }

  i {
    color: #a1a09a;
    margin: 0 5px 0 0;
  }

  .profile-info {
    margin: 0 8px;
    line-height: normal;
    max-width: 110px;
    font-size: 12px;

    .profile-name,
    .profile-username {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .profile-name {
      color: white;
    }
    .profile-username {
      color: #a1a09a;
    }
  }

  .DropdownMenuContent {
    background-color: #161615;
    border-radius: 6px;
    margin-top: 11px;
    padding: 12px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
    z-index: 10000000;
  }
  .DropdownMenuContent[data-side='top'] {
    animation-name: slideDownAndFade;
  }
  .DropdownMenuContent[data-side='right'] {
    animation-name: slideLeftAndFade;
  }
  .DropdownMenuContent[data-side='bottom'] {
    animation-name: slideUpAndFade;
  }
  .DropdownMenuContent[data-side='left'] {
    animation-name: slideRightAndFade;
  }

  .DropdownMenuItem {
    all: unset;
    font-size: 13px;
    line-height: 1;
    color: #9ba1a6;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 12px;
    position: relative;
    user-select: none;
    outline: none;
  }

  .DropdownMenuItem:hover {
    color: white;
    cursor: pointer;
  }

  .DropdownMenuItem i {
    font-size: 20px;
    margin-right: 10px;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 800px) {
    .profile-info,
    .ph {
      display: none;
    }

    > button {
      background: var(--sand6);
      padding: 1px;
    }

    .d-inline-block {
      img {
        width: 43px !important;
        height: 43px !important;
      }
    }
  }
`;

export const UserDropdownMenu = () => {
  const accountId = useAuthStore((store) => store.accountId);
  const logOut = useAuthStore((store) => store.logOut);
  const components = useBosComponents();

  return (
    <Wrapper>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <VmComponent
            src={components.UI.profileImage}
            props={{
              accountId,
              className: 'd-inline-block',
            }}
          />
          <div className="profile-info">
            <div className="profile-name">
              <VmComponent src={components.UI.profileName} />
            </div>
            <div className="profile-username">{accountId}</div>
          </div>
          <i className="ph ph-caret-down"></i>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={-5}>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => logOut()}>
            <i className="ph-duotone ph-sign-out"></i>
            Sign out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow style={{ fill: '#161615' }} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Wrapper>
  );
};
