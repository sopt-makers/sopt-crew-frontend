import React, { useEffect } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { Option } from '../Select/OptionItem';

interface FormControllerProps {
  name: string;
  render: ControllerProps['render'];
  defaultValue?: boolean | string | number | Option | Option[] | string[];
}

function FormController({ name, render, defaultValue }: FormControllerProps) {
  const { control, formState, setValue } = useFormContext();

  //고치기
  useEffect(() => {
    if (defaultValue === false) {
      setValue(name, false);
    }
  }, [defaultValue, name, setValue]);
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
