import { styled } from 'stitches.config';
import React from 'react';

interface LabelProps {
  required?: boolean;
  children?: React.ReactNode;
}

const Label = ({ required, children }: LabelProps) => {
  return <SLabel required={required}>{children}</SLabel>;
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
  },
});
