import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 12px;
  animation: spin 1200ms infinite linear;

  i {
    color: currentColor;
    font-size: 16px;
    line-height: 16px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export function Spinner() {
  return (
    <Wrapper>
      <i className="ph ph-spinner"></i>
    </Wrapper>
  );
}
