import React from 'react';

type TextInputProps = {
  label: string;
  message: string;
  required: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, message, required }: TextInputProps, ref) => (
    <>
      <label>
        {label}
        {required ? '*' : ''}
      </label>
      <span>{message}</span>
      <input type="text" ref={ref} />
    </>
  )
);

export default TextInput;
