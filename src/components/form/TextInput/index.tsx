import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/form/Label';
import HelpMessage from '@components/form/HelpMessage';
import ErrorMessage from '../ErrorMessage';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  message?: string;
  error?: string;
  required?: boolean;
  right?: React.ReactNode;
  // NOTE: controlled component로 사용할 때 필요한 props
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, label, message, error, required, ...props }: TextInputProps, ref) => (
    <SContainer>
      {label && <Label required={required}>{label}</Label>}
      {message && <HelpMessage>{message}</HelpMessage>}
      <SInputWrapper>
        <SInput type={type || 'text'} ref={ref} {...props} />
        {props.right}
      </SInputWrapper>
      {error && <SErrorMessage>{error}</SErrorMessage>}
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
  width: '100%',
  padding: '18px 20px',
  display: 'flex',
  alignItems: 'center',
  fontAg: '16_medium_100',
  color: '$gray10',
  background: '$gray700',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray100',
  },

  '@tablet': {
    padding: '16px',
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
