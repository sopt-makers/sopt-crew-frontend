import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/Form/Label';
import HelpMessage from '@components/Form/HelpMessage';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  message?: string;
  required?: boolean;
  right?: React.ReactNode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, label, message, required, ...props }: TextInputProps, ref) => (
    <SContainer>
      {label && <Label required={required}>{label}</Label>}
      {message && <HelpMessage>{message}</HelpMessage>}
      <SInputWrapper>
        <SInput type={type || 'text'} ref={ref} {...props} />
        {props.right}
      </SInputWrapper>
    </SContainer>
  )
);

export default TextInput;

const SContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const SInputWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
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
