import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import React, { HTMLAttributes } from 'react';
import { styled } from 'stitches.config';
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
      <SHelperTextContainer>
        {error && <SErrorMessage>{error}</SErrorMessage>}
        {props.maxLength && (
          <STextCount overflow={(props.value + '').length > props.maxLength}>
            {(props.value + '').length} / {props.maxLength}
          </STextCount>
        )}
      </SHelperTextContainer>
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
  background: '$gray800',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray300',
  },

  '@media (max-width: 768px)': {
    padding: '16px',
  },
});
const STextCount = styled('span', {
  textAlign: 'right',
  fontAg: '12_medium_100',
  color: '$gray300',
  marginLeft: 'auto',
  marginTop: '$8',

  variants: {
    overflow: {
      true: {
        color: '$error',
      },
    },
  },
});

const SErrorMessage = styled(ErrorMessage, {
  marginTop: '$8',
});

const SHelperTextContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});
