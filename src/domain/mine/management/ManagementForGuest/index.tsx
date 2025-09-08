import { GetMeetingMemberList } from '@api/meeting/type';
import { useUserProfileQueryOption } from '@api/user/query';
import ManagementListSkeleton from '@domain/mine/management/Skeleton/ManagementListSkeleton';
import { Option } from '@shared/form/Select/OptionItem';
import { useQuery } from '@tanstack/react-query';
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
  const { data: me } = useQuery(useUserProfileQueryOption());

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
