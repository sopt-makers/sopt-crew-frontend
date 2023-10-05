/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEventHandler } from 'react';
import { styled } from 'stitches.config';
import ArrowIcon from '@assets/svg/arrow_small_right.svg';
import { Flex } from '@components/util/layout/Flex';
import SelectComboBoxItem from './SelectComboBoxItem';
import useSessionStorage from '@hooks/useSessionStorage';
import SelectBottomSheet from './BottomSheet';
interface SelectListDataType {
  label: string;
  subject: string;
  options: string[];
}

interface SelectProps {
  selectListData: SelectListDataType;
  selectedValues: any[];
  addValue: (value: any) => void;
  deleteValue: (value: any) => void;
}

function MultiSelect({ selectListData, selectedValues, addValue, deleteValue }: SelectProps) {
  const [isVisible, setIsVisible] = useSessionStorage(selectListData.subject, false);
  const onDismissSelectList = () => setIsVisible(false);
  const toggleSelectList = () => setIsVisible(!isVisible);

  return (
    <>
      <SSelectWrapper>
        <SSelectDisplay
          align="center"
          justify="between"
          onClick={() => toggleSelectList()}
          isSelected={selectedValues.length !== 0}
        >
          <SCategory isSelected={selectedValues.length !== 0}>{selectListData.label}</SCategory>
          <SArrowIcon isVisible={isVisible} />
        </SSelectDisplay>

        <>
          <SSelectBoxList as="ul" isVisible={isVisible}>
            {selectListData.options.map(option => (
              <SelectComboBoxItem
                key={option}
                value={option}
                isChecked={selectedValues?.filter(selectedValue => selectedValue === option).length > 0}
                onCheck={addValue}
                onRemove={deleteValue}
              />
            ))}
          </SSelectBoxList>
          <SelectBottomSheet label={selectListData.label} isVisible={isVisible} handleClose={() => setIsVisible(false)}>
            {selectListData.options.map(option => (
              <SelectComboBoxItem
                key={option}
                value={option}
                isChecked={selectedValues?.filter(selectedValue => selectedValue === option).length > 0}
                onCheck={addValue}
                onRemove={deleteValue}
              />
            ))}
          </SelectBottomSheet>
          <SelectOverlay isVisible={isVisible} onClick={() => onDismissSelectList()} />
        </>
      </SSelectWrapper>
    </>
  );
}
export default MultiSelect;

const SSelectWrapper = styled('div', {
  position: 'relative',
  '& + &': {
    ml: '$12',
    '@tablet': {
      ml: '$8',
    },
  },
});

const SSelectDisplay = styled(Flex, {
  width: '153px',
  border: '1px solid $black40',
  borderRadius: '14px',
  padding: '$18 $20',
  cursor: 'pointer',
  variants: {
    isSelected: {
      true: {
        border: '1px solid $white100',
      },
    },
  },
  '@tablet': {
    width: '96px',
    height: '36px',
    padding: '$12 $10',
    borderRadius: '$8',
  },
});

const SArrowIcon = styled(ArrowIcon, {
  transform: 'rotate(90deg)',
  variants: {
    isVisible: {
      true: {
        transform: 'rotate(270deg)',
      },
    },
  },
});

const SCategory = styled('span', {
  fontAg: '18_medium_100',
  color: '$white100',
  variants: {
    isSelected: {
      true: {
        color: '1px solid $white100',
      },
    },
  },
  '@tablet': {
    fontAg: '12_semibold_100',
  },
});
const SSelectBoxList = styled('div', {
  width: '100%',
  position: 'absolute',
  border: '1px solid $black40',
  borderRadius: '$10',
  padding: '$8 $16',
  top: '63px',
  backgroundColor: '$black100',
  zIndex: '$2',
  '& li': {
    height: '50px',
  },
  '& li:last-child': {
    borderBottom: 'none',
  },
  variants: {
    isVisible: {
      true: { visibility: 'visible' },
      false: { visibility: 'hidden' },
    },
  },
  '@tablet': {
    display: 'none',
  },
});

interface OverlayProps {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const SelectOverlay = ({ onClick, isVisible }: OverlayProps) => {
  return <SSelectOverlay isVisible={isVisible} onClick={onClick} />;
};

const SSelectOverlay = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$1',
  width: '100%',
  height: '100%',
  variants: {
    isVisible: {
      true: { display: 'block' },
      false: { display: 'none' },
    },
  },
  // TODO: 임시 삭제후, select에도 적용 논의
  '@tablet': {
    backgroundColor: '$black80_trans',
  },
});
