import { styled } from 'stitches.config';
import React, { HTMLAttributes } from 'react';
import Label from '@components/Form/Label';
import HelpMessage from '@components/Form/HelpMessage';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  message?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, message, required, ...props }: TextareaProps, ref) => (
    <>
      <Label required={required}>{label}</Label>
      {message && <HelpMessage>{message}</HelpMessage>}
      <STextarea ref={ref} {...props} />
    </>
  )
);

export default Textarea;

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
