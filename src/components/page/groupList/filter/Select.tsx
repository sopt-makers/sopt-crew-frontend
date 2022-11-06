import { MouseEventHandler } from 'react';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import ArrowButton from '@components/button/Arrow';
import { FilterType, OptionType } from './Filter';
import { Flex } from '@components/util/layout/Flex';
import { useFilterContext } from '@providers/groupList/FilterProvider';

interface HandleOptionFunctions {
  addFilterOptions: (value: string) => void;
  deleteFilterOptions: (value: string) => void;
}
interface SelectProps {
  filter: FilterType;
  setFalseSelectList: (category: string) => void;
  isSelectListVisible: boolean;
  toggleSelectList: (category: string) => void;
}

function Select({
  isSelectListVisible,
  setFalseSelectList,
  toggleSelectList,
  filter,
}: SelectProps) {
  // const { bool: isVisibleList, setFalse, toggle } = useBooleanState();
  const { selectedFilterOptions, addFilterOptions, deleteFilterOptions } =
    useFilterContext();
  return (
    <Box
      css={{
        position: 'relative',
        '& + &': {
          ml: '$12',
        },
      }}
    >
      <SSelectDisplay
        align="center"
        justify="between"
        onClick={() => toggleSelectList(filter.category)}
      >
        <SCategory>{filter.label}</SCategory>
        <ArrowButton size="small" direction="bottom" />
      </SSelectDisplay>
      {isSelectListVisible && (
        <>
          <SSelectBoxList as="ul">
            {filter.options.map(option => (
              <SelectListItem
                key={option.value}
                option={option}
                selectedFilterOptions={
                  selectedFilterOptions[
                    filter.category as 'category' | 'status'
                  ]
                }
                addFilterOptions={addFilterOptions(filter.category)}
                deleteFilterOptions={deleteFilterOptions(filter.category)}
              />
            ))}
          </SSelectBoxList>
          <SelectOverlay onClick={() => setFalseSelectList(filter.category)} />
        </>
      )}
    </Box>
  );
}
export default Select;

const SSelectDisplay = styled(Flex, {
  width: '147px',
  border: '1px solid $black40',
  borderRadius: '$10',
  padding: '$16 $20 $16 $16',
  cursor: 'pointer',
});

const SCategory = styled('span', {
  fontAg: '18_medium_100',
  color: '$gray60',
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
interface SelectListItemProps extends HandleOptionFunctions {
  option: OptionType;
  selectedFilterOptions: string[];
}

function SelectListItem({
  option,
  selectedFilterOptions,
  addFilterOptions,
  deleteFilterOptions,
}: SelectListItemProps) {
  const isCheckedOption =
    selectedFilterOptions.filter(
      selectedOption => selectedOption === option.name
    ).length > 0;
  const handleCheckOption = () => {
    if (!isCheckedOption) addFilterOptions(option.name);
    if (isCheckedOption) deleteFilterOptions(option.name);
  };

  return (
    <Flex
      as="li"
      onClick={handleCheckOption}
      align="center"
      css={{
        height: '44px',
      }}
    >
      <SCheckbox
        type="checkbox"
        checked={isCheckedOption}
        id={option.name}
        name={option.name}
      />
      <label htmlFor={option.name}>{option.name}</label>
    </Flex>
  );
}

const SCheckbox = styled('input', {
  width: '20px',
  height: '20px',
  border: '1px solid $white',
  borderRadius: '4px',
  mr: '$8',
  '& + label': {
    cursor: 'pointer',
  },
  variants: {
    checked: {
      true: {
        background: 'url(/assets/img/checkBox/selected.png) left top no-repeat',
        border: '0',
      },
    },
  },
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
