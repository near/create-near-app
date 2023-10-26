import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

type Fill = 'solid' | 'outline' | 'ghost';
type Size = 'small' | 'default' | 'large';
type Variant = 'primary' | 'secondary' | 'affirmative' | 'destructive';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  disabled?: boolean;
  fill?: Fill;
  href?: string;
  icon?: string;
  iconLeft?: string;
  iconRight?: string;
  label: string;
  loading?: boolean;
  size?: Size;
  type?: 'button' | 'submit';
  variant?: Variant;
};

type StyledProps = {
  disabled?: boolean;
  fill: Fill;
  icon?: string;
  loading?: boolean;
  size: Size;
  variant: Variant;
};

const variants: Record<Variant, any> = {
  primary: {
    outline: {
      background: 'var(--sand1)',
      border: 'var(--sand6)',
      color: 'var(--violet8)',
      iconColor: 'var(--violet9)',
      hover: {
        border: 'var(--violet6)',
      },
      focus: {
        border: 'var(--violet9)',
      },
      active: {
        background: 'var(--violet2)',
        border: 'var(--violet7)',
      },
    },
    solid: {
      background: 'var(--sand12)',
      border: 'var(--sand12)',
      color: 'var(--sand1)',
      iconColor: 'var(--sand9)',
      hover: {
        background: 'var(--sand11)',
        border: 'var(--sand11)',
      },
      focus: {},
      active: {},
    },
  },
  secondary: {
    outline: {
      background: 'var(--sand1)',
      border: 'var(--sand6)',
      color: 'var(--sand12)',
      iconColor: 'var(--sand10)',
      hover: {
        border: 'var(--sand8)',
      },
      focus: {
        border: 'var(--violet8)',
      },
      active: {
        background: 'var(--sand3)',
        border: 'var(--sand8)',
      },
    },
    solid: {
      background: 'var(--sand3)',
      border: 'var(--sand6)',
      color: 'var(--sand12)',
      iconColor: 'var(--sand11)',
      hover: {
        background: 'var(--sand4)',
      },
      focus: {
        border: 'var(--violet8)',
      },
      active: {
        background: 'var(--sand5)',
      },
    },
  },
  destructive: {
    outline: {
      background: 'var(--sand1)',
      border: 'var(--sand6)',
      color: 'var(--red8)',
      iconColor: 'var(--red9)',
      hover: {
        border: 'var(--red6)',
      },
      focus: {
        border: 'var(--violet8)',
      },
      active: {
        background: 'var(--red2)',
        border: 'var(--red7)',
      },
    },
    solid: {
      background: 'var(--red9)',
      border: 'var(--red8)',
      color: 'var(--red12)',
      iconColor: 'var(--red11)',
      hover: {
        background: 'var(--red10)',
      },
      focus: {
        border: 'var(--red11)',
      },
      active: {
        background: 'var(--red8)',
      },
    },
  },
  affirmative: {
    outline: {
      background: 'var(--sand1)',
      border: 'var(--sand6)',
      color: 'var(--green11)',
      iconColor: 'var(--green10)',
      hover: {
        border: 'var(--green9)',
      },
      focus: {
        border: 'var(--violet8)',
      },
      active: {
        background: 'var(--green2)',
        border: 'var(--green8)',
      },
    },
    solid: {
      background: 'var(--green9)',
      border: 'var(--green8)',
      color: 'var(--green12)',
      iconColor: 'var(--green11)',
      hover: {
        background: 'var(--green10)',
      },
      focus: {
        border: 'var(--green11)',
      },
      active: {
        background: 'var(--green8)',
      },
    },
  },
};
variants.primary.ghost = {
  ...variants.primary.outline,
  border: 'hsla(0, 0%, 100%, 0)',
  background: 'hsla(0, 0%, 100%, 0)',
};
variants.secondary.ghost = {
  ...variants.secondary.outline,
  border: 'hsla(0, 0%, 100%, 0)',
  background: 'hsla(0, 0%, 100%, 0)',
};
variants.destructive.ghost = {
  ...variants.destructive.outline,
  border: 'hsla(0, 0%, 100%, 0)',
  background: 'hsla(0, 0%, 100%, 0)',
};
variants.affirmative.ghost = {
  ...variants.affirmative.outline,
  border: 'hsla(0, 0%, 100%, 0)',
  background: 'hsla(0, 0%, 100%, 0)',
};

const sizes: Record<Size, any> = {
  small: {
    font: 'var(--text-xs)',
    gap: '6px',
    height: '32px',
    icon: '14px',
    paddingX: '16px',
  },
  default: {
    font: 'var(--text-s)',
    gap: '8px',
    height: '40px',
    icon: '18px',
    paddingX: '20px',
  },
  large: {
    font: 'var(--text-base)',
    gap: '8px',
    height: '48px',
    icon: '18px',
    paddingX: '24px',
  },
};

function returnColor(variant: Variant, fill: string, state: string, key: string) {
  if (state === 'default') return variants[variant][fill][key];
  return variants[variant][fill][state][key] || variants[variant][fill][key];
}

const StyledButton = styled.button<StyledProps>`
  all: unset;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${(p) => (p.icon ? sizes[p.size].height : undefined)};
  height: ${(p) => sizes[p.size].height};
  padding: ${(p) => (p.icon ? '0' : `0 ${sizes[p.size].paddingX}`)};
  font: ${(p) => sizes[p.size].font};
  font-weight: 600;
  line-height: 1;
  border-radius: 100px;
  background: ${(p) => returnColor(p.variant, p.fill, 'default', 'background')};
  color: ${(p) => returnColor(p.variant, p.fill, 'default', 'color')};
  border: 1px solid ${(p) => returnColor(p.variant, p.fill, 'default', 'border')};
  box-shadow: 0 0 0 0px var(--violet4);
  cursor: pointer;
  transition: all 200ms;
  text-decoration: none !important;

  &:hover {
    background: ${(p) => returnColor(p.variant, p.fill, 'hover', 'background')};
    color: ${(p) => returnColor(p.variant, p.fill, 'hover', 'color')};
    border: 1px solid ${(p) => returnColor(p.variant, p.fill, 'hover', 'border')};
  }
  &:focus {
    background: ${(p) => returnColor(p.variant, p.fill, 'focus', 'background')};
    color: ${(p) => returnColor(p.variant, p.fill, 'focus', 'color')};
    border: 1px solid ${(p) => returnColor(p.variant, p.fill, 'focus', 'border')};
    box-shadow: 0 0 0 4px var(--violet4);
  }
  &:active {
    background: ${(p) => returnColor(p.variant, p.fill, 'active', 'background')};
    color: ${(p) => returnColor(p.variant, p.fill, 'active', 'color')};
    border: 1px solid ${(p) => returnColor(p.variant, p.fill, 'active', 'border')};
  }

  ${(p) =>
    p.loading &&
    `
        pointer-events: none;
      `}

  ${(p) =>
    p.disabled &&
    `
        opacity: 1;
        background: ${p.fill === 'ghost' ? 'hsla(0, 0%, 100%, 0)' : 'var(--sand3)'};
        border-color: var(--sand3);
        color: var(--sand8);
        pointer-events: none;
    
        i {
          color: var(--sand8) !important;
        }
      `}
`;

const Inner = styled.span<StyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => sizes[p.size].gap};

  i {
    font-size: ${(p) => sizes[p.size].icon};
    line-height: ${(p) => sizes[p.size].icon};
    color: ${(p) => (p.icon ? undefined : returnColor(p.variant, p.fill, 'default', 'iconColor'))};
  }

  ${(p) =>
    p.loading &&
    `
        opacity: 0;
      `}
`;

const Label = styled.span``;

const Spinner = styled.i<StyledProps>`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: calc(${(p) => sizes[p.size].icon} * -0.5) auto 0;
  width: ${(p) => sizes[p.size].icon};
  height: ${(p) => sizes[p.size].icon};
  font-size: ${(p) => sizes[p.size].icon};
  line-height: ${(p) => sizes[p.size].icon};
  animation: spin 800ms infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      disabled,
      fill = 'solid',
      href,
      icon,
      iconLeft,
      iconRight,
      label,
      loading,
      size = 'default',
      type = 'button',
      variant = 'primary',
      ...forwardedProps
    },
    ref,
  ) => {
    const conditionalAttributes: Record<string, unknown> = href
      ? {
        as: 'a',
        href,
      }
      : {
        type,
        disabled: disabled || loading,
      };

    if (icon) {
      conditionalAttributes['aria-label'] = label;
    }

    const styledProps: StyledProps = {
      disabled,
      fill,
      icon,
      loading,
      size,
      variant,
    };

    return (
      <StyledButton ref={ref} {...styledProps} {...conditionalAttributes} {...forwardedProps}>
        <>
          {loading && <Spinner {...styledProps} className="ph-bold ph-circle-notch" />}
          <Inner {...styledProps}>
            {icon ? (
              <i className={icon} />
            ) : (
              <>
                {iconLeft && <i className={iconLeft} />}
                <Label>{label}</Label>
                {iconRight && <i className={iconRight} />}
              </>
            )}
          </Inner>
        </>
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';
