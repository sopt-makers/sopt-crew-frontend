import { MouseEventHandler } from 'react';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import ArrowButton from '@components/button/Arrow';
import { Flex } from '@components/util/layout/Flex';
import { useSelectListVisionContext } from '@providers/groupList/SelectListVisionProvider';
import { useMultiQueryString } from '@hooks/queryString';
import SelectComboBoxItem from './SelectComboBoxItem';
import { FilterType } from '..';

interface SelectProps {
  filter: FilterType;
}

function MultiSelectComboBox({ filter }: SelectProps) {
  const { isSelectListVisible, onDismissSelectList, toggleSelectList } =
    useSelectListVisionContext();

  const {
    value: selectedFilterValue,
    addValue: addFilterOption,
    deleteValue: deleteFilterOption,
  } = useMultiQueryString(filter.subject);

  return (
    <SSelectWrapper>
      <SSelectDisplay
        align="center"
        justify="between"
        onClick={() => toggleSelectList(filter.subject)}
        isSelected={selectedFilterValue.length !== 0}
      >
        <SCategory isSelected={selectedFilterValue.length !== 0}>
          {filter.label}
        </SCategory>
        <ArrowButton size="small" direction="bottom" />
      </SSelectDisplay>
      {isSelectListVisible[filter.subject] && (
        <>
          <SSelectBoxList as="ul">
            {filter.options.map(option => (
              <SelectComboBoxItem
                key={option}
                value={option}
                isChecked={
                  selectedFilterValue?.filter(
                    selectedValue => selectedValue === option
                  ).length > 0
                }
                onCheck={addFilterOption}
                onRemove={deleteFilterOption}
              />
            ))}
          </SSelectBoxList>
          <SelectOverlay onClick={() => onDismissSelectList(filter.subject)} />
        </>
      )}
    </SSelectWrapper>
  );
}
export default MultiSelectComboBox;

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
});

interface OverlayProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}
const SelectOverlay = ({ onClick }: OverlayProps) => {
  return <SSelectOverlay onClick={onClick} />;
};

const SSelectOverlay = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$1',
  width: '100%',
  height: '100%',
});
