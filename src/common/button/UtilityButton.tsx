import IconThumbsUpFilled from '@assets/svg/thumbs_up_filled.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { IconLink, IconThumbsUp } from '@sopt-makers/icons';
import { styled } from '@stitches/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface UtilityButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: 's' | 'xs';
  isActive?: boolean;
  activeNumber?: number;
  iconType: 'thumb' | 'link';
}

const UtilityButton = ({
  children,
  size = 's',
  isActive = false,
  iconType,
  className,
  activeNumber,
  ...props
}: UtilityButtonProps) => {
  const isThumbActive = iconType === 'thumb' && isActive;

  const renderIcon = () => {
    if (iconType === 'link') return <IconLink />;
    if (iconType === 'thumb') return isThumbActive ? <IconThumbsUpFilled /> : <IconThumbsUp />;
    return null;
  };

  const showActiveNumber = typeof activeNumber === 'number' && activeNumber > 0;

  return (
    <SButton className={className} size={size} isActive={isActive} type="button" {...props}>
      {renderIcon()}
      <SLabel>{children}</SLabel>

      {showActiveNumber && <SActiveNumber>{activeNumber}</SActiveNumber>}
    </SButton>
  );
};

export default UtilityButton;

const SButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  border: '1px solid $gray700',
  borderRadius: '9999px',

  '& svg': {
    width: '16px',
    height: '16px',
  },

  variants: {
    size: {
      s: {
        height: '36px',
        padding: '$10 $14',
        ...fontsObject.LABEL_3_14_SB,
      },
      xs: {
        height: '32px',
        padding: '$8 $12',
        ...fontsObject.LABEL_4_12_SB,
      },
    },

    isActive: {
      true: {
        color: '$white',
      },
      false: {
        color: '$gray400',

        '&:hover': {
          color: '$white',
        },
      },
    },
  },

  defaultVariants: {
    size: 's',
    isActive: false,
  },
});

const SLabel = styled('span', {
  whiteSpace: 'nowrap',
});

const SActiveNumber = styled('span', {});
