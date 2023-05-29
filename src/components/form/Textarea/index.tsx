import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/form/Label';
import HelpMessage from '@components/form/HelpMessage';
import ErrorMessage from '../ErrorMessage';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value: string;
  message?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, message, error, required, ...props }: TextareaProps, ref) => {
    return (
      <SContainer>
        {label && <Label required={required}>{label}</Label>}
        {message && <HelpMessage>{message}</HelpMessage>}
        <STextarea ref={ref} {...props} />
        <SBottomContainer>
          {error && <SErrorMessage>{error}</SErrorMessage>}
          {props.maxLength && (
            <STextCount overflow={props.value.replace(/\r\n/g, '\n').length > props.maxLength}>
              {props.value.replace(/\r\n/g, '\n').length} / {props.maxLength}
            </STextCount>
          )}
        </SBottomContainer>
      </SContainer>
    );
  }
);

export default Textarea;

const SContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
const STextarea = styled('textarea', {
  boxSizing: 'border-box',
  width: '100%',
  minHeight: '157px',
  padding: '16px 20px 20px 16px',
  fontAg: '16_medium_150',
  color: '$white100',
  background: '$black60',
  border: 'none',
  resize: 'none',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray100',
  },
});
const SBottomContainer = styled('div', {
  marginTop: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const STextCount = styled('span', {
  width: '100%',
  textAlign: 'right',
  fontAg: '12_medium_100',
  color: '$gray60',
  variants: {
    overflow: {
      true: {
        color: '$red100',
      },
    },
  },
});
const SErrorMessage = styled(ErrorMessage, {
  whiteSpace: 'nowrap',
});
