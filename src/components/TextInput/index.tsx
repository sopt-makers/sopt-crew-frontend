import { styled } from '@stitches/react';
import React from 'react';

type TextInputProps = {
  label: string;
  message?: string;
  required?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, message, required }: TextInputProps, ref) => (
    <>
      <Label>
        {label}
        {required ? '*' : ''}
      </Label>
      {message && <Message>{message}</Message>}
      <Input type="text" ref={ref} />
    </>
  )
);

const Label = styled('label', {
  marginBottom: 12,
  display: 'inline-block',
  width: '100%',
  fontAg: '18_semibd_100',
  color: '$white',
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
