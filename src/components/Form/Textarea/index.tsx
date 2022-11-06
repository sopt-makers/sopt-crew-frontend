import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/Form/Label';
import HelpMessage from '@components/Form/HelpMessage';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  message?: string;
  required?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, message, required, ...props }: TextareaProps, ref) => {
    return (
      <SContainer>
        <Label required={required}>{label}</Label>
        {message && <HelpMessage>{message}</HelpMessage>}
        <STextarea ref={ref} {...props} />
        {props.maxLength && (
          <STextCount overflow={props.value.length > props.maxLength}>
            {props.value.length} / {props.maxLength}
          </STextCount>
        )}
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
  color: '$white',
  background: '$black60',
  border: 'none',
  resize: 'none',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray100',
  },
});
const STextCount = styled('span', {
  marginTop: '12px',
  alignSelf: 'flex-end',
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
