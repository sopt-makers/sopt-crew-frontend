/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEventHandler } from 'react';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import ArrowButton from '@components/button/Arrow';
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

function MultiSelect({
  selectListData,
  selectedValues,
  addValue,
  deleteValue,
}: SelectProps) {
  const [isVisible, setIsVisible] = useSessionStorage(
    selectListData.subject,
    false
  );
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
          <SCategory isSelected={selectedValues.length !== 0}>
            {selectListData.label}
          </SCategory>
          <ArrowButton size="small" direction="bottom" />
        </SSelectDisplay>

        <>
          <SSelectBoxList as="ul" isVisible={isVisible}>
            {selectListData.options.map(option => (
              <SelectComboBoxItem
                key={option}
                value={option}
                isChecked={
                  selectedValues?.filter(
                    selectedValue => selectedValue === option
                  ).length > 0
                }
                onCheck={addValue}
                onRemove={deleteValue}
              />
            ))}
          </SSelectBoxList>
          <SelectBottomSheet
            label={selectListData.label}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          >
            {selectListData.options.map(option => (
              <SelectComboBoxItem
                key={option}
                value={option}
                isChecked={
                  selectedValues?.filter(
                    selectedValue => selectedValue === option
                  ).length > 0
                }
                onCheck={addValue}
                onRemove={deleteValue}
              />
            ))}
          </SelectBottomSheet>
          <SelectOverlay
            isVisible={isVisible}
            onClick={() => onDismissSelectList()}
          />
        </>
      </SSelectWrapper>
    </>
  );
}
export default MultiSelect;

const SSelectWrapper = styled(Box, {
  position: 'relative',
  '& + &': {
    ml: '$12',
  },
});

const SSelectDisplay = styled(Flex, {
  width: '147px',
  border: '1px solid $black40',
  borderRadius: '$10',
  padding: '$16 $20 $16 $16',
  cursor: 'pointer',
  variants: {
    isSelected: {
      true: {
        border: '1px solid $white',
      },
    },
  },
  '@mobile': {
    width: '86px',
  },
});

const SCategory = styled('span', {
  fontAg: '18_medium_100',
  color: '$gray60',
  variants: {
    isSelected: {
      true: {
        color: '1px solid $white',
      },
    },
  },
  '@mobile': {
    fontAg: '14_medium_100',
  },
});
const SSelectBoxList = styled(Box, {
  width: '100%',
  position: 'absolute',
  border: '1px solid $black40',
  borderRadius: '$10',
  p: '$16',
  top: '58px',
  backgroundColor: '$black100',
  zIndex: '$2',
  variants: {
    isVisible: {
      true: { visibility: 'visible' },
      false: { visibility: 'hidden' },
    },
  },
  '@mobile': {
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

const SSelectOverlay = styled(Box, {
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
  '@mobile': {
    backgroundColor: '$black60',
    opacity: 0.2,
  },
});
