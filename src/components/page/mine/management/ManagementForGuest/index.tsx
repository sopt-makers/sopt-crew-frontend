import { GetMeetingMemberList } from '@api/meeting/type';
import { useUserProfileQuery } from '@api/user/hooks';
import { Option } from '@components/form/Select/OptionItem';
import ManagementListSkeleton from '@components/page/mine/management/Skeleton/ManagementListSkeleton';
import { styled } from 'stitches.config';
import ManagementHeaderForGuest from './ManagementHeaderForGuest';
import ManagementListItemForGuest from './ManagementListItemForGuest';

type ManagementForGuestProps = {
  isManagementDataLoading: boolean;
  management: GetMeetingMemberList['response'];
  onChangeSelectOption: (
    setValue: (value: string | number) => void,
    optionList: Option[]
  ) => (changeOption: Option) => void;
  convertedNumberTake: Option;
  setTake: (value: string | number) => void;
};

const ManagementForGuest = ({
  isManagementDataLoading,
  management,
  onChangeSelectOption,
  convertedNumberTake,
  setTake,
}: ManagementForGuestProps) => {
  const { data: me } = useUserProfileQuery();

  return (
    <>
      <SListHeader>
        <ManagementHeaderForGuest
          isMeetingDataLoading={isManagementDataLoading}
          management={management}
          onChangeSelectOption={onChangeSelectOption}
          convertedNumberTake={convertedNumberTake}
          setTake={setTake}
        />
      </SListHeader>
      {isManagementDataLoading ? (
        <ManagementListSkeleton />
      ) : (
        <>
          {management && management.apply?.length > 0 ? (
            management?.apply.map(application => (
              <ManagementListItemForGuest
                key={application.id}
                application={application}
                isActive={me?.orgId === application.user.orgId}
              />
            ))
          ) : (
            <SEmptyView>참여자가 없습니다.</SEmptyView>
          )}
        </>
      )}
    </>
  );
};

export default ManagementForGuest;

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
