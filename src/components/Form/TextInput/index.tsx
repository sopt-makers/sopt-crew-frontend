import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/Form/Label';
import HelpMessage from '@components/Form/HelpMessage';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  message?: string;
  required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, message, required, ...props }: TextInputProps, ref) => (
    <>
      <Label required={required}>{label}</Label>
      {message && <HelpMessage>{message}</HelpMessage>}
      <SInput type="text" ref={ref} {...props} />
    </>
  )
);

export default TextInput;

const SInput = styled('input', {
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
