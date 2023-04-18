import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { TabList } from '@components/tabList/TabList';
import ManagementListSkeleton from '@components/page/meetingManagement/ManagementListSkeleton';
import MeetingInformationSkeleton from '@components/page/meetingManagement/MeetingInformationSkeleton';
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
      setValue(optionList.findIndex(option => option.value === changeOption.value));
    };

  const handleCSVDownload = () => {
    downloadCSVMutate(id);
  };

  return (
    <SManagementPage>
      <TabList text="mine" size="big">
        <Link href="/" passHref>
          <a>
            <TabList.Item text="all">전체 모임</TabList.Item>
          </a>
        </Link>
        <Link href="/mine" passHref>
          <a>
            <TabList.Item text="mine">내 모임</TabList.Item>
          </a>
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

const SManagementPage = styled(Box, {
  mt: '$100',
  mb: '$180',

  '@mobile': {
    mt: '$31',
    mb: '$66',
  },
});

const SListHeader = styled(Box, {
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

const SListTitle = styled(Box, {
  fontAg: '32_bold_100',

  '@mobile': {
    fontAg: '18_bold_100',
  },
});

const SDownloadButton = styled('button', {
  color: '$white',
  fontAg: '18_bold_100',
  border: '1px solid $white',
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

const SSelectContainer = styled(Box, {
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

const SSelectWrapper = styled(Box, {
  '& button': {
    borderRadius: '14px',
    border: '1px solid $black20',
    backgroundColor: '$black100',

    '@mobile': {
      borderRadius: '8px',
      minWidth: '$96',
      height: '$36',
      padding: '$12 $10',
      fontAg: '12_semibold_100',
    },
  },

  '& ul': {
    background: '$black100',
    position: 'absolute',
    top: '$50',
    minWidth: '$147',
  },

  '& div': {
    background: '$black100',
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

const SEmptyView = styled(Box, {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $black40`,
  fontAg: '24_medium_100',
  color: '$gray80',

  '@mobile': {
    fontAg: '16_medium_100',
    height: '$556',
  },
});

const SPaginationWrapper = styled(Box, {
  mt: '$80',

  '@mobile': {
    mt: '$40',
  },
});
