import { components } from '@/__generated__/schema2';
import { numberOptionList, sortOptionList } from '@data/options';
import Filter from '@domain/mine/management/Filter';
import ItemDescriptionBox from '@domain/mine/management/ManagementForHost/ItemDescriptionBox';
import ManagementHeaderForHost from '@domain/mine/management/ManagementForHost/ManagementHeaderForHost';
import ManagementListItemForHost from '@domain/mine/management/ManagementForHost/ManagementListItemForHost';
import ManagementListSkeleton from '@domain/mine/management/Skeleton/ManagementListSkeleton';
import Select from '@shared/form/Select';
import { Option } from '@shared/form/Select/OptionItem';
import { styled } from 'stitches.config';

type ManagementForHostProps = {
  isManagementDataLoading: boolean;
  management: {
    apply: components['schemas']['ApplyInfoDetailDto'][];
    meta: components['schemas']['PageMetaDto'];
  };
  id: string;
  onChangeSelectOption: (
    setValue: (value: string | number) => void,
    optionList: Option[]
  ) => (changeOption: Option) => void;
  convertedNumberTake: Option;
  setTake: (value: string | number) => void;
  convertedSortTake: Option;
  setSort: (value: string | number) => void;
};

const ManagementForHost = ({
  id,
  isManagementDataLoading,
  management,
  onChangeSelectOption,
  convertedNumberTake,
  setTake,
  convertedSortTake,
  setSort,
}: ManagementForHostProps) => {
  return (
    <>
      <SListHeader>
        <ManagementHeaderForHost id={id} isMeetingDataLoading={isManagementDataLoading} management={management} />
      </SListHeader>
      <SSelectContainer>
        <Filter />
        <div>
          <SSelectNumberWrapper>
            <Select
              value={convertedNumberTake}
              options={numberOptionList}
              onChange={onChangeSelectOption(setTake, numberOptionList)}
            />
          </SSelectNumberWrapper>
          <SSelectWrapper>
            <Select
              value={convertedSortTake}
              options={sortOptionList}
              onChange={onChangeSelectOption(setSort, sortOptionList)}
            />
          </SSelectWrapper>
        </div>
      </SSelectContainer>
      <ItemDescriptionBox />
      {isManagementDataLoading ? (
        <ManagementListSkeleton />
      ) : (
        <>
          {management && management.apply?.length > 0 ? (
            management?.apply.map(application => (
              <ManagementListItemForHost key={application.id} meetingId={Number(id)} application={application} />
            ))
          ) : (
            <SEmptyView>신청자가 없습니다.</SEmptyView>
          )}
        </>
      )}
    </>
  );
};

export default ManagementForHost;

const SListHeader = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$64',
  mb: '$48',
  position: 'relative',

  '@mobile': {
    mt: '$40',
    mb: '$24',
  },
});

const SSelectContainer = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mb: '$36',
  position: 'relative',

  '& > div': {
    flexType: 'verticalCenter',
  },

  '@mobile': {
    mb: '$16',
  },
});

const SSelectWrapper = styled('div', {
  '& button': {
    borderRadius: '14px',
    border: '1px solid $gray600',
    backgroundColor: '$gray950',

    '@mobile': {
      borderRadius: '8px',
      minWidth: '$96',
      height: '$36',
      padding: '$12 $10',
      fontAg: '12_semibold_100',
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

const SSelectNumberWrapper = styled(SSelectWrapper, {
  '@mobile': {
    display: 'none',
  },
});

const SEmptyView = styled('div', {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $gray600`,
  fontAg: '24_medium_100',
  color: '$gray400',

  '@mobile': {
    fontAg: '16_medium_100',
    height: '$556',
  },
});
