import { Listbox } from '@headlessui/react';
import Label from '@shared/form/Label';
import { styled } from 'stitches.config';
import ErrorMessage from '../../ErrorMessage';
import Button from '../Button';
import OptionItem, { defaultOption, Option } from '../OptionItem';
import CheckboxOptionItem from '../OptionItem/CheckboxOptionItem';
import { MultipleSelectProps, SelectProps } from '../types/props';
import { isAllSelect, isAllUnselected } from '../utils';

export default function BaseSelect(props: SelectProps | MultipleSelectProps) {
  const { label, value, options, required, error, multiple, onChange, onBlur } = props;

  const handleChange = (newValue: Option | Option[]) => {
    if (multiple) {
      let newValues = newValue as Option[];
      const lastSelectedItem = newValues[newValues.length - 1];
      // NOTE: 전체 옵션을 선택한 경우, 전체 옵션을 체크해주어야 한다.
      if (isAllSelect(lastSelectedItem)) return onChange(options);
      // NOTE: 전체 옵션을 선택 해제한 경우, 전체 옵션을 체크 해제해주어야 한다.
      if (isAllUnselected(value, newValues)) return onChange([value[0] ?? defaultOption]);
      // NOTE: 전체 선택되어 있는 상황에서 다른 옵션을 체크 해제하는 경우 전체 옵션도 해제해주어야 한다.
      if (newValues.length !== options.length) {
        newValues = newValues.filter(v => v.value !== 'all');
      }
      onChange(newValues);
    } else {
      onChange(newValue as Option);
    }
  };
  const selectableOptions = options.filter(option => option.value);

  const buttonLabel = () => {
    if (multiple) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const selectedItems = value?.filter(v => v.value).sort((a, b) => a.order! - b.order!);
      // NOTE: 선택된 옵션이 존재하지 않거나 빈 배열일경우 디폴트 옵션을 라벨로 표기한다.
      if (!selectedItems?.length) return { text: value?.[0]?.label, active: false };
      // NOTE: 전체 선택이 포함된경우 '전체' 라고 표기한다.
      if (isAllSelect(selectedItems[0])) return { text: '전체', active: true };
      // NOTE: 전체 선택이 포함되지 않은 경우 선택된 옵션을 표기한다. 이때 개수가 여러개면 '00 외 0' 형식으로 보여준다.
      const suffix = selectedItems.length > 1 ? ` 외 ${selectedItems.length - 1}` : '';
      return { text: `${selectedItems[0]?.label}${suffix}`, active: true };
    }
    return { text: value?.label, active: Boolean(value?.value) };
  };

  return (
    <>
      <Listbox value={value} onChange={handleChange} onBlur={onBlur} by="value" as="div" multiple={multiple}>
        {({ open }) => (
          <>
            {label && <Label required={required}>{label}</Label>}
            <Button label={buttonLabel()} open={open}></Button>

            <SOptionList>
              {selectableOptions.map(option =>
                multiple ? (
                  <CheckboxOptionItem key={option.value} option={option} />
                ) : (
                  <OptionItem key={option.value} option={option} css={{ minWidth: '260px' }} />
                )
              )}
            </SOptionList>
          </>
        )}
      </Listbox>
      {error && <SErrorMessage>{error}</SErrorMessage>}
    </>
  );
}

const SOptionList = styled(Listbox.Options, {
  position: 'absolute',
  maxHeight: '300px',
  width: '260px',
  padding: '8px 8px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $gray600',
  borderRadius: 10,
  mt: '$8',
  background: '$gray800',
  overflow: 'auto',
  zIndex: 100,
  gap: '6px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
