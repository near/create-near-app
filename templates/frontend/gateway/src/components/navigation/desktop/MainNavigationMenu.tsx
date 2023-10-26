import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import styled from 'styled-components';

import { navigationCategories } from '../navigation-categories';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  z-index: 1;
  flex-grow: 1;
  padding: 0 1rem;
  height: var(--nav-height);

  @media (min-width: 1145px) {
    // This center aligns the nav items in the center of the viewport on larger screens
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: min-content;
  }
`;

const NavRoot = styled(NavigationMenu.Root)`
  height: 100%;

  > div {
    height: 100%;
  }
`;

const NavList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const NavItem = styled(NavigationMenu.Item)`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;

const NavTrigger = styled(NavigationMenu.Trigger)`
  all: unset;
  font: var(--text-s);
  color: var(--sand12);
  font-weight: 600;
  padding: 0 1rem;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  transition: all 200ms;

  &:hover,
  &:focus,
  &[data-state='open'] {
    background: var(--sand4);
  }
`;

const NavContent = styled(NavigationMenu.Content)`
  position: absolute;
  top: calc(100% - 1rem + 1px);
  left: 0;
  padding-top: 1rem;
  transform-origin: center top;
  animation: fadeIn 200ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1, 0.5);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const Container = styled.div`
  display: flex;
  padding: 12px 0;
  transform-origin: center top;
  background: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  max-height: calc(100dvh - var(--nav-height));
  overflow: auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
`;

const NavLink = styled(NavigationMenu.Link)`
  display: block;
  padding: 7px 0;
  font: var(--text-s);
  color: var(--sand12);
  transition: color 200ms;
  white-space: nowrap;
  outline: none;

  &:hover,
  &:focus {
    color: var(--sand12);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 0;
  min-width: 200px;
`;

const SectionTitle = styled.p`
  font: var(--text-xs);
  color: var(--sand10);
  font-weight: 450;
  padding: 12px 0;
  letter-spacing: 0.24px;
  margin: 0;
`;

export const MainNavigationMenu = () => {

  return (
    <Wrapper>
      <NavRoot delayDuration={0}>
        <NavList>
          {navigationCategories
            .filter((category) => category.visible === 'all' || category.visible === 'desktop')
            .map((category) => (
              <NavItem key={category.title}>
                <NavTrigger >{category.title}</NavTrigger>

                <NavContent>
                  <Container>
                    {category.sections.map((section) => (
                      <Section key={section.title}>
                        {section.title && <SectionTitle>{section.title}</SectionTitle>}

                        {section.links.map((link) => (
                          <NavLink key={link.title} asChild>
                            <Link href={link.url} target={link.url.indexOf('http') === 0 ? '_blank' : undefined}>
                              {link.title}
                            </Link>
                          </NavLink>
                        ))}
                      </Section>
                    ))}
                  </Container>
                </NavContent>
              </NavItem>
            ))}
        </NavList>
      </NavRoot>
    </Wrapper>
  );
};
