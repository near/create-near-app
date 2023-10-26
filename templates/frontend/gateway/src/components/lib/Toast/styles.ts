import * as ToastPrimitive from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

const hideAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideInAnimation = keyframes`
  from { transform: translateX(calc(100% + 1rem)) }
  to { transform: translateX(0) }
`;

const swipeOutAnimation = keyframes`
  from { transform: translateX(var(--radix-toast-swipe-end-x)) }
  to { transform: translateX(calc(100% + 1rem)) }
`;

export const Viewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  max-height: 100vh;
  max-width: 20rem;
  z-index: 2147483632;
`;

export const Root = styled(ToastPrimitive.Root)`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #000;
  color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 1rem;

  i {
    font-size: 1.4rem;
  }

  &[data-state='open'] {
    animation: ${slideInAnimation} 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${hideAnimation} 200ms ease-in forwards;
  }
  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe='end'] {
    animation: ${swipeOutAnimation} 100ms ease-out forwards;
  }

  &[data-type='ERROR'] {
    background: var(--red11);
  }
  &[data-type='SUCCESS'] {
    background: var(--green11);
  }
  &[data-type='INFO'] {
    background: var(--sand12);
  }
  &[data-type='WARNING'] {
    background: var(--amber4);
    color: var(--amber12);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0rem;
`;

export const Title = styled(ToastPrimitive.Title)`
  font: 450 16px/1.5 'Mona Sans', sans-serif;
  color: currentColor;
`;

export const Description = styled(ToastPrimitive.Description)`
  font: 450 14px/1.5 'Mona Sans', sans-serif;
  color: currentColor;
  opacity: 0.8;
`;

export const CloseButton = styled(ToastPrimitive.Close)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 100%;
  cursor: pointer;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.25);
  background: none;
  transition: all 200ms;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 1);
  }

  i {
    font-size: 0.8rem;
  }

  &[data-type='WARNING'] {
    color: var(--amber12);
  }
`;
