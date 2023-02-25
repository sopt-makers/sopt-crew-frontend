import React from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { Option } from '../Select/OptionItem';

interface FormControllerProps {
  name: string;
  render: ControllerProps['render'];
  defaultValue?: string | number | Option;
}

function FormController({ name, render, defaultValue }: FormControllerProps) {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={formState.defaultValues?.[name] || defaultValue || ''}
      render={({ field, fieldState, formState }) => render({ field, fieldState, formState })}
    />
  );
}

export default FormController;
