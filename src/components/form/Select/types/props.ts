import type { Option } from '../OptionItem';
import type { FocusEventHandler } from 'react';

export interface SelectProps {
  label?: string;
  value?: Option;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (value: Option) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}
