import { styled } from 'stitches.config';
import React from 'react';

interface LabelProps {
  required?: boolean;
  children?: React.ReactNode;
  size?: 'small';
}

const Label = ({ required, children, size }: LabelProps) => {
  return (
    <SLabel required={required} size={size}>
      {children}
    </SLabel>
  );
};

export default Label;

const SLabel = styled('label', {
  marginBottom: 12,
  display: 'inline-block',
  width: '100%',
  fontAg: '18_semibold_100',
  color: '$white',
  variants: {
    required: {
      true: {
        '&::after': {
          content: '*',
          marginLeft: 1,
        },
      },
    },
    size: {
      small: {
        fontAg: '16_semibold_100',
        color: '$gray50',
      },
    },
  },
});
