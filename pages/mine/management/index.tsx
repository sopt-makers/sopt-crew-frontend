import { ampli } from '@/ampli';
import { useMutationDownloadMeetingMemberCSV, useQueryGetMeeting } from '@api/API_LEGACY/meeting/hooks';
import { useQueryGetMeetingPeopleList } from '@api/meeting/hook';
import DownloadIcon from '@assets/svg/download.svg';
import CrewTab from '@components/CrewTab';
import Select from '@components/form/Select';
import { Option } from '@components/form/Select/OptionItem';
import Pagination from '@components/page/list/Pagination';
import Filter from '@components/page/mine/management/Filter';
import ItemDescriptionBox from '@components/page/mine/management/ItemDescriptionBox';
import ManagementListItem from '@components/page/mine/management/ManagementListItem';
import ManagementListItemForHost from '@components/page/mine/management/ManagementListItemForHost';
import MeetingInformation from '@components/page/mine/management/MeetingInformation';
import ManagementListSkeleton from '@components/page/mine/management/Skeleton/ManagementListSkeleton';
import MeetingInformationSkeleton from '@components/page/mine/management/Skeleton/MeetingInformationSkeleton';
import { numberOptionList, numberOptionListDefault, sortOptionList, sortOptionListDefault } from '@data/options';
import { usePageParams, useSortByDateParams, useStatusParams, useTakeParams } from '@hooks/queryString/custom';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stitches.config';

// TODO: 컴포넌트 책임이 너무 큼 (host 여부에 따라 컴포넌트 분리 필요)
const ManagementPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { value: page, setValue: setPage } = usePageParams();
  const { value: status } = useStatusParams();
  const { value: take, setValue: setTake } = useTakeParams();
  const { value: sortByDate, setValue: setSort } = useSortByDateParams();
  const { isLoading: isMeetingDataLoading, data: meetingData } = useQueryGetMeeting({
    params: { id },
  });
  const isHost = meetingData?.host ?? false;
  const { mutate: downloadCSVMutate, isLoading: isDownloadCSVLoading } = useMutationDownloadMeetingMemberCSV();

  const convertedNumberTake = numberOptionList[Number(take)] ?? numberOptionListDefault;

  const convertedSortTake = sortOptionList[Number(sortByDate)] ?? sortOptionListDefault;

  const { isLoading: isManagementDataLoading, data: management } = useQueryGetMeetingPeopleList({
    params: {
      id,
      page: (page || 0) as number,
      take: Number(convertedNumberTake.value),
      status,
      date: sortOptionList[Number(sortByDate) || 1]?.value as string,
    },
  });

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

  const handleCSVDownload = () => {
    downloadCSVMutate(id);
  };

  return (
    <SManagementPage>
      <CrewTab />
      {isMeetingDataLoading ? (
        <MeetingInformationSkeleton />
      ) : (
        meetingData && <MeetingInformation meetingData={meetingData} />
      )}
      <SListHeader>
        <SListTitle>
          {!isMeetingDataLoading && <span>모임 {isHost ? '신청자' : '참여자'}</span>}
          {management && <span> ({management.meta.itemCount})</span>}
        </SListTitle>
        {isHost ? (
          <SDownloadButton onClick={handleCSVDownload} disabled={isDownloadCSVLoading}>
            <DownloadIcon />
            <span>CSV 다운로드</span>
          </SDownloadButton>
        ) : (
          <SSelectNumberWrapper>
            <Select
              value={convertedNumberTake}
              options={numberOptionList}
              onChange={handleChangeSelectOption(setTake, numberOptionList)}
            />
          </SSelectNumberWrapper>
        )}
      </SListHeader>
      {isHost && (
        <>
          <SSelectContainer>
            <Filter />
            <div>
              <SSelectNumberWrapper>
                <Select
                  value={convertedNumberTake}
                  options={numberOptionList}
                  onChange={handleChangeSelectOption(setTake, numberOptionList)}
                />
              </SSelectNumberWrapper>
              <SSelectWrapper>
                <Select
                  value={convertedSortTake}
                  options={sortOptionList}
                  onChange={handleChangeSelectOption(setSort, sortOptionList)}
                />
              </SSelectWrapper>
            </div>
          </SSelectContainer>
          <ItemDescriptionBox />
        </>
      )}
      {isManagementDataLoading ? (
        <ManagementListSkeleton />
      ) : (
        <>
          {management && management.apply?.length > 0 ? (
            management?.apply.map(application => (
              <React.Fragment key={application.id}>
                {isHost ? (
                  <ManagementListItemForHost meetingId={Number(id)} application={application} />
                ) : (
                  <ManagementListItem application={application} />
                )}
              </React.Fragment>
            ))
          ) : (
            <SEmptyView>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyView>
          )}
          {management && management.meta?.pageCount > 0 && (
            <SPaginationWrapper>
              <Pagination
                totalPagesLength={management?.meta?.pageCount}
                currentPageIndex={Number(page)}
                changeCurrentPage={setPage}
              />
            </SPaginationWrapper>
          )}
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

const SListTitle = styled('div', {
  fontAg: '32_bold_100',

  '@mobile': {
    fontAg: '18_bold_100',
  },
});

const SDownloadButton = styled('button', {
  color: '$gray10',
  fontAg: '18_bold_100',
  border: '1px solid $gray10',
  borderRadius: '14px',
  padding: '$18 $24 $18 $20',
  flexType: 'verticalCenter',

  '& > svg': {
    mr: '$12',
  },

  '@mobile': {
    border: 'none',
    padding: '$0',

    span: {
      display: 'none',
    },

    svg: {
      mr: '$0',
    },
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

const SPaginationWrapper = styled('div', {
  mt: '$80',

  '@mobile': {
    mt: '$40',
  },
});
