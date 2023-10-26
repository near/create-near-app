import * as Accordion from '@radix-ui/react-accordion';
import Link from 'next/link';
import styled from 'styled-components';

import { navigationCategories } from '../navigation-categories';

type Props = {
  onCloseMenu: () => void;
};

const Wrapper = styled.div`
  margin: 0 -24px;
`;

const AccordionRoot = styled(Accordion.Root)``;

const AccordionItem = styled(Accordion.Item)``;

const AccordionHeader = styled(Accordion.Header)`
  display: block;
  margin: 0;
`;

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  box-sizing: border-box;
  background: var(--white);
  font: var(--text-base);
  font-weight: 600;
  color: var(--sand12);
  padding: 0 24px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  i {
    transition: transform 200ms;
  }

  &[data-state='open'] {
    i {
      transform: rotate(-180deg);
    }
  }
`;

const AccordionContent = styled(Accordion.Content)`
  background: var(--sand3);
  overflow: hidden;

  &[data-state='open'] {
    animation: slideDown 200ms;
  }
  &[data-state='closed'] {
    animation: slideUp 200ms;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

const Section = styled.div`
  padding: 0.5rem 0;

  a {
    display: block;
    font: var(--text-s);
    color: var(--sand12);
    padding: 0.5rem 24px;
    margin: 0;
  }
`;

const SectionTitle = styled.p`
  font: var(--text-xs);
  color: var(--sand10);
  font-weight: 450;
  padding: 0.5rem 24px 1rem;
  margin: 0 0 0.5rem;
  letter-spacing: 0.24px;
  border-bottom: 1px solid var(--sand6);
`;

export const AccordionMenu = (props: Props) => {

  return (
    <Wrapper>
      <AccordionRoot type="multiple">
        {navigationCategories
          .filter((category) => category.visible === 'all' || category.visible === 'mobile')
          .map((category) => (
            <AccordionItem value={category.title} key={category.title}>
              <AccordionHeader>
                <AccordionTrigger>
                  {category.title}
                  <i className="ph-bold ph-caret-down" />
                </AccordionTrigger>
              </AccordionHeader>

              <AccordionContent>
                {category.sections.map((section) => (
                  <Section key={section.title}>
                    {section.title && <SectionTitle>{section.title}</SectionTitle>}

                    {section.links.map((link) => (
                      <Link
                        href={link.url}
                        target={link.url.indexOf('http') === 0 ? '_blank' : undefined}
                        key={link.title}
                        onClick={props.onCloseMenu}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </Section>
                ))}

              </AccordionContent>
            </AccordionItem>
          ))}
      </AccordionRoot>
    </Wrapper>
  );
};
