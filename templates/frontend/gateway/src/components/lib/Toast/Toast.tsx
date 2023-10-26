import * as ToastPrimitive from '@radix-ui/react-toast';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import * as S from './styles';

type CloseButtonProps = ComponentProps<typeof S.CloseButton>;

export const Root = S.Root;
export const Title = S.Title;
export const Description = S.Description;
export const Content = S.Content;
export const Viewport = S.Viewport;
export const Action = ToastPrimitive.Action;
export const Provider = ToastPrimitive.Provider;
export const Close = ToastPrimitive.Close;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <S.CloseButton aria-label="Close" ref={ref} {...props}>
      <i className="ph-bold ph-x"></i>
    </S.CloseButton>
  );
});
CloseButton.displayName = 'CloseButton';
