import { FocusEventHandler, Fragment, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import Label from '@components/form/Label';
import Button from './Button';
import OptionItem, { Option } from './OptionItem';
import ErrorMessage from '../ErrorMessage';
import SelectBottomSheet from '@components/filter/MultiSelect/BottomSheet';
import { Box } from '@components/box/Box';
import SelectRadioItem from '@components/filter/MultiSelect/SelectRadioItem';
import MobileOptionItem from './OptionItem/MobileOptionItem';
import { useDisplay } from '@hooks/useDisplay';
import useModal from '@hooks/useModal';
import BottomSheet from './BottomSheet';
interface SelectProps {
  label?: string;
  value?: Option;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (value: Option) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

function Select({ label, value, options, required, error, onChange, onBlur }: SelectProps) {
  const { isMobile } = useDisplay();
  const { isModalOpened, handleModalClose, handleToggle } = useModal();

  const stringifiedSelectedValue = useMemo(() => JSON.stringify(value), [value]);
  const handleChange = (stringifiedValue: string) => {
    onChange(JSON.parse(stringifiedValue));
  };
  const selectableOptions = options.filter(option => option.value);
  return isMobile ? (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <BottomSheet.Button value={value} open={isModalOpened} handleOpen={handleToggle} />
      <BottomSheet label={label || ''} handleClose={handleModalClose} isOpen={isModalOpened}>
        <Listbox value={stringifiedSelectedValue} onChange={handleChange} onBlur={onBlur} as="div">
          <Listbox.Options as={Fragment} static>
            <ul>
              {selectableOptions.map(option => (
                <MobileOptionItem
                  key={option.value}
                  option={option}
                  stringifiedSelectedValue={stringifiedSelectedValue || ''}
                />
              ))}
            </ul>
          </Listbox.Options>
        </Listbox>
      </BottomSheet>
    </div>
  ) : (
    <div>
      <Listbox value={stringifiedSelectedValue} onChange={handleChange} onBlur={onBlur} as="div">
        {({ open }) => (
          <>
            {label && <Label required={required}>{label}</Label>}
            <Button value={value} open={open} />
            <SOptionList>
              {
                // NOTE: value가 null 이면 placeholder 전용 옵션. 이는 제거하고 목록을 보여주자.
                selectableOptions.map(option => (
                  <OptionItem key={option.value} option={option} css={{ minWidth: '147px' }} />
                ))
              }
            </SOptionList>

            {/* <SelectBottomSheet label={label || ''} isVisible={open}>
              <Listbox value={stringifiedSelectedValue} onChange={handleChange} onBlur={onBlur} as="div">
                <Listbox.Options as={Fragment} static>
                  <ul>
                    {selectableOptions.map(option => (
                      <MobileOptionItem
                        key={option.value}
                        option={option}
                        stringifiedSelectedValue={stringifiedSelectedValue || ''}
                      />
                    ))}
                  </ul>
                </Listbox.Options>
              </Listbox>
            </SelectBottomSheet> */}
          </>
        )}
      </Listbox>
      {error && <SErrorMessage>{error}</SErrorMessage>}
    </div>
  );
}

export default Select;

const SOptionList = styled(Listbox.Options, {
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
  '@mobile': {
    display: 'none',
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
