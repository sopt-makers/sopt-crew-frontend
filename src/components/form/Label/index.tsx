import { styled } from 'stitches.config';
import React from 'react';
import { fontsObject } from '@sopt-makers/fonts';

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
  color: '$gray10',
  ...fontsObject.LABEL_3_14_SB,
  variants: {
    required: {
      true: {
        '&::after': {
          content: ' *',
          marginLeft: 1,
          color: '$secondary',
        },
      },
    },
    size: {
      small: {
        color: '$gray50',
      },
    },
  },
});
