import styled from 'styled-components';

type Props = {
  color?: string;
  font?: string;
  weight?: string;
};

export const Text = styled.p<Props>`
  font: ${(p) => (p.font ? `var(--${p.font})` : 'var(--text-base)')};
  font-weight: ${(p) => p.weight ?? '400'};
  color: ${(p) => (p.color ? `var(--${p.color})` : 'currentColor')};
  margin: 0;
`;
