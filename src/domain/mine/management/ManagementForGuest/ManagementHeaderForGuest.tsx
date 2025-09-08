import { components } from '@/__generated__/schema2';
import { numberOptionList } from '@data/options';
import Select from '@shared/form/Select';
import { Option } from '@shared/form/Select/OptionItem';
import { styled } from 'stitches.config';

type ManagementHeaderForGuestProps = {
  isMeetingDataLoading: boolean;
  management?: {
    apply: components['schemas']['ApplyInfoDetailDto'][];
    meta: components['schemas']['PageMetaDto'];
  };
  onChangeSelectOption: (
    setValue: (value: string | number) => void,
    optionList: Option[]
  ) => (changeOption: Option) => void;
  convertedNumberTake: Option;
  setTake: (value: string | number) => void;
};

const ManagementHeaderForGuest = ({
  isMeetingDataLoading,
  management,
  convertedNumberTake,
  onChangeSelectOption,
  setTake,
}: ManagementHeaderForGuestProps) => {
  return (
    <>
      <SListTitle>
        {!isMeetingDataLoading && <span>모임 참여자</span>}
        {management && <span> ({management.meta.itemCount})</span>}
      </SListTitle>
      <SSelectNumberWrapper>
        <Select
          value={convertedNumberTake}
          options={numberOptionList}
          onChange={onChangeSelectOption(setTake, numberOptionList)}
        />
      </SSelectNumberWrapper>
    </>
  );
};

export default ManagementHeaderForGuest;

const SListTitle = styled('div', {
  fontAg: '32_bold_100',

  '@mobile': {
    fontAg: '18_bold_100',
  },
});

const SSelectNumberWrapper = styled('div', {
  '& button': {
    borderRadius: '14px',
    border: '1px solid $gray600',
    backgroundColor: '$gray950',

    '@mobile': {
      display: 'none',
    },
  },

  '& ul': {
    background: '$gray950',
    position: 'absolute',
    top: '$50',
    minWidth: '$147',
  },

  '& div': {
    background: '$gray950',
  },

  '& + &': {
    marginLeft: '12px',
  },
});
