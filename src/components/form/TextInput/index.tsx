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
  maxLength?: number;
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
      {props.maxLength && (
        <STextCount overflow={(props.value + '').length > props.maxLength}>
          {(props.value + '').length} / {props.maxLength}
        </STextCount>
      )}
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

  // height: '$48',
});
const SInput = styled('input', {
  width: '100%',
  padding: '11px 16px',
  display: 'flex',
  alignItems: 'center',
  fontAg: '16_medium_150',
  lineHeight: '26px',
  color: '$gray10',
  background: '$gray800',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray300',
  },
});
const STextCount = styled('span', {
  width: '100%',
  marginTop: '$8',
  textAlign: 'right',
  fontAg: '12_medium_100',
  color: '$gray300',
  variants: {
    overflow: {
      true: {
        color: '$error',
      },
    },
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
