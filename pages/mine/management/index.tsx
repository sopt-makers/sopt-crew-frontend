import { ampli } from '@/ampli';
import { useMeetingMemberListQueryOption, useMeetingQueryOption } from '@api/meeting/query';
import { numberOptionList, numberOptionListDefault, sortOptionList, sortOptionListDefault } from '@data/options';
import Pagination from '@domain/list/Pagination';
import ManagementForGuest from '@domain/mine/management/ManagementForGuest';
import ManagementForHost from '@domain/mine/management/ManagementForHost';
import MeetingInformation from '@domain/mine/management/MeetingInformation';
import MeetingInformationSkeleton from '@domain/mine/management/Skeleton/MeetingInformationSkeleton';
import { usePageParams, useSortByDateParams, useStatusParams, useTakeParams } from '@hook/queryString/custom';
import CrewTab from '@shared/CrewTab';
import { Option } from '@shared/form/Select/OptionItem';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

const ManagementPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { value: page, setValue: setPage } = usePageParams();
  const { value: status } = useStatusParams();
  const { value: take, setValue: setTake } = useTakeParams();
  const { value: sortByDate, setValue: setSort } = useSortByDateParams();

  const { isLoading: isMeetingDataLoading, data: meetingData } = useQuery(
    useMeetingQueryOption({
      meetingId: Number(id),
    })
  );

  const convertedNumberTake = numberOptionList[Number(take)] ?? numberOptionListDefault;
  const convertedSortTake = sortOptionList[Number(sortByDate)] ?? sortOptionListDefault;

  const { isLoading: isManagementDataLoading, data: management } = useQuery(
    useMeetingMemberListQueryOption({
      meetingId: id,
      params: {
        page: Number(page),
        take: Number(convertedNumberTake.value),
        status: status.join(','),
        date: sortOptionList[Number(sortByDate) || 1]?.value as 'desc' | 'asc',
      },
    })
  );

  const isHost = meetingData?.host ?? false;

  const handleChangeSelectOption =
    (setValue: (value: string | number) => void, optionList: Option[]) => (changeOption: Option) => {
      const changeOptionValue = String(changeOption.value);

      switch (optionList) {
        case numberOptionList:
          ampli.filterListOptionManagement({ manage_listing_no: Number(changeOptionValue) });
          break;
        case sortOptionList:
          ampli.filterManagementListOrder({ manage_sort: changeOptionValue });
          break;
      }

      setValue(optionList.findIndex(option => option.value === changeOptionValue));
    };

  return (
    <SManagementPage>
      <CrewTab />
      {isMeetingDataLoading ? (
        <MeetingInformationSkeleton />
      ) : (
        meetingData && <MeetingInformation meetingData={meetingData} />
      )}
      {management && management.meta?.pageCount > 0 && (
        <>
          {isHost ? (
            <ManagementForHost
              id={id}
              isManagementDataLoading={isManagementDataLoading}
              management={management}
              onChangeSelectOption={handleChangeSelectOption}
              convertedNumberTake={convertedNumberTake}
              setTake={setTake}
              convertedSortTake={convertedSortTake}
              setSort={setSort}
            />
          ) : (
            <ManagementForGuest
              isManagementDataLoading={isManagementDataLoading}
              management={management}
              onChangeSelectOption={handleChangeSelectOption}
              convertedNumberTake={convertedNumberTake}
              setTake={setTake}
            />
          )}
          <SPaginationWrapper>
            <Pagination
              totalPagesLength={management?.meta?.pageCount}
              currentPageIndex={Number(page)}
              changeCurrentPage={setPage}
            />
          </SPaginationWrapper>
        </>
      )}
    </SManagementPage>
  );
};

export default ManagementPage;

const SManagementPage = styled('div', {
  mt: '$100',
  mb: '$180',

  '@mobile': {
    mt: '$31',
    mb: '$66',
  },
});

const SPaginationWrapper = styled('div', {
  mt: '$80',

  '@mobile': {
    mt: '$40',
  },
});
