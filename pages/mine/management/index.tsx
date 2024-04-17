import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from 'stitches.config';
import { TabList } from '@components/tabList/TabList';
import ManagementListSkeleton from '@components/page/meetingManagement/Skeleton/ManagementListSkeleton';
import MeetingInformationSkeleton from '@components/page/meetingManagement/Skeleton/MeetingInformationSkeleton';
import ManagementListItem from '@components/page/meetingManagement/ManagementListItem';
import MeetingInformation from '@components/page/meetingManagement/MeetingInformation';
import Select from '@components/form/Select';
import { Option } from '@components/form/Select/OptionItem';
import ItemDescriptionBox from '@components/page/meetingManagement/ItemDescriptionBox';
import Pagination from '@components/page/meetingList/Pagination';
import {
  usePageParams,
  useSortByDateParams,
  useStatusParams,
  useTakeParams,
  useTypeParams,
} from '@hooks/queryString/custom';
import { numberOptionList, sortOptionList } from '@data/options';
import {
  useMutationDownloadMeetingMemberCSV,
  useQueryGetMeeting,
  useQueryGetMeetingPeopleList,
} from '@api/meeting/hooks';
import Filter from '@components/page/meetingManagement/Filter';
import DownloadIcon from '@assets/svg/download.svg';
import { ampli } from '@/ampli';

const ManagementPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { value: page, setValue: setPage } = usePageParams();
  const { value: type } = useTypeParams();
  const { value: status } = useStatusParams();
  const { value: take, setValue: setTake } = useTakeParams();
  const { value: sortByDate, setValue: setSort } = useSortByDateParams();
  const { isLoading: isMeetingDataLoading, data: meetingData } = useQueryGetMeeting({
    params: { id },
  });
  const isHost = meetingData?.host ?? false;
  const { mutate: downloadCSVMutate, isLoading: isDownloadCSVLoading } = useMutationDownloadMeetingMemberCSV();
  const { isLoading: isManagementDataLoading, data: management } = useQueryGetMeetingPeopleList({
    params: {
      id,
      page: (page || 0) as number,
      take: Number(numberOptionList[Number(take) || 0].value),
      status,
      type,
      date: sortOptionList[Number(sortByDate) || 0].value as string,
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
      <TabList text="mine" size="big">
        <Link href="/" onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
          <TabList.Item text="all">전체 모임</TabList.Item>
        </Link>
        <Link href="/mine" onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </Link>
      </TabList>
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
              value={numberOptionList[Number(take) || 0]}
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
                  value={numberOptionList[Number(take) || 0]}
                  options={numberOptionList}
                  onChange={handleChangeSelectOption(setTake, numberOptionList)}
                />
              </SSelectNumberWrapper>
              <SSelectWrapper>
                <Select
                  value={sortOptionList[Number(sortByDate) || 0]}
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
              <ManagementListItem
                key={application.id}
                meetingId={Number(id)}
                application={application}
                isHost={isHost}
              />
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

  '@tablet': {
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

  '@tablet': {
    mt: '$40',
    mb: '$24',
  },
});

const SListTitle = styled('div', {
  fontAg: '32_bold_100',

  '@tablet': {
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

  '@tablet': {
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

  '@tablet': {
    mb: '$16',
  },
});

const SSelectWrapper = styled('div', {
  '& button': {
    borderRadius: '14px',
    border: '1px solid $gray600',
    backgroundColor: '$gray950',

    '@tablet': {
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
  '@tablet': {
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

  '@tablet': {
    fontAg: '16_medium_100',
    height: '$556',
  },
});

const SPaginationWrapper = styled('div', {
  mt: '$80',

  '@tablet': {
    mt: '$40',
  },
});
