import { FocusEventHandler, Fragment, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import Label from '@components/form/Label';
import Button from './Button';
import OptionItem, { Option } from './OptionItem';
import ErrorMessage from '../ErrorMessage';

interface SelectProps {
  label?: string;
  value?: Option;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (value: Option) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

function Select({
  label,
  value,
  options,
  required,
  error,
  onChange,
  onBlur,
}: SelectProps) {
  const stringifiedSelectedValue = useMemo(
    () => JSON.stringify(value),
    [value]
  );
  const handleChange = (stringifiedValue: string) => {
    onChange(JSON.parse(stringifiedValue));
  };

  return (
    <div>
      <Listbox
        value={stringifiedSelectedValue}
        onChange={handleChange}
        onBlur={onBlur}
        as="div"
      >
        {({ open }) => (
          <>
            {label && <Label required={required}>{label}</Label>}
            <Button value={value} open={open} />

            <Listbox.Options as={Fragment}>
              <SOptionList>
                {options
                  // NOTE: value가 null 이면 placeholder 전용 옵션. 이는 제거하고 목록을 보여주자.
                  .filter(option => option.value)
                  .map(option => (
                    <OptionItem key={option.value} option={option} />
                  ))}
              </SOptionList>
            </Listbox.Options>
          </>
        )}
      </Listbox>
      {error && <SErrorMessage>{error}</SErrorMessage>}
    </div>
  );
}

export default Select;

const SOptionList = styled('ul', {
  position: 'absolute',
  maxHeight: '300px',
  padding: '8px 0px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $black40',
  borderRadius: 10,
  mt: '$8',
  background: '$black40',
  overflow: 'auto',
  zIndex: 100,
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
