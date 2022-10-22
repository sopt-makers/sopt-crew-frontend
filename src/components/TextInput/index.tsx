import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  message?: string;
  required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, message, required, ...props }: TextInputProps, ref) => (
    <>
      <Label required={required}>{label}</Label>
      {message && <Message>{message}</Message>}
      <Input type="text" ref={ref} {...props} />
    </>
  )
);

const Label = styled('label', {
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
const Message = styled('span', {
  marginBottom: 18,
  display: 'inline-block',
  fontAg: '14_medium_100',
  color: '$gray100',
});
const Input = styled('input', {
  padding: '18px 20px',
  display: 'flex',
  alignItems: 'center',
  fontAg: '16_medium_100',
  color: '$white',
  background: '$black60',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray100',
  },
});

export default TextInput;
