import { Box } from '@components/box/Box';
import ListItem from '@components/page/groupInvitation/ListItem';
import { TabList } from '@components/tabList/TabList';
import { styled } from 'stitches.config';
import GroupInformation from '@components/page/groupInvitation/GroupInformation';
import Pagination from '@components/page/groupList/Pagination';
import { usePageParams } from '@hooks/queryString/custom';
import Select from '@components/Form/Select';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  applicantOptionList,
  numberOptionList,
  sortOptionList,
} from 'src/data/options';
import {
  useQueryGetGroup,
  useQueryGetGroupPeopleList,
} from 'src/api/meeting/hooks';
import { useQueryGroupListOfMine } from 'src/api/user/hooks';
import { useRouter } from 'next/router';
import { Option } from '@components/Form/Select/OptionItem';

const InvitationPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { value: page, setValue: setPage } = usePageParams();

  const { isLoading: isGroupDataLoading, data: groupData } = useQueryGetGroup({
    params: { id },
  });
  const [selectedNumber, setSelectedNumber] = useState<Option>(
    numberOptionList[0]
  );
  const [selectedApplicant, setSelectedApplicant] = useState<Option>(
    applicantOptionList[0]
  );
  const [selectedSort, setSelectedSort] = useState<Option>(sortOptionList[0]);
  const { data: invitation, refetch } = useQueryGetGroupPeopleList({
    params: {
      id,
      page: (page || 0) as number,
      take: selectedNumber.value as number,
      status: (selectedApplicant.value as number) - 1,
      date: selectedSort.value as string,
    },
  });

  const { isLoading: isMadeGroupDataLoading, data: madeGroupData } =
    useQueryGroupListOfMine();
  const madeGroupIdList = madeGroupData?.meetings.map(meeting => meeting.id);
  const isHost = madeGroupIdList?.includes(Number(id)) ?? false;

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch, id, selectedNumber, selectedApplicant, selectedSort]);

  if (isGroupDataLoading || isMadeGroupDataLoading) {
    return <div>loading...</div>;
  }

  return (
    <SInvitationPage>
      <TabList text="mine" size="big" onChange={() => {}}>
        <Link href="/" passHref>
          <a>
            <TabList.Item text="all">모임 전체</TabList.Item>
          </a>
        </Link>
        <Link href="/mine" passHref>
          <a>
            <TabList.Item text="mine">내 모임</TabList.Item>
          </a>
        </Link>
      </TabList>
      {groupData && <GroupInformation groupData={groupData} />}
      <SListHeader>
        <SListTitle>
          모임 {isHost ? '신청자' : '참여자'}
          {invitation && <span> ({invitation.meta.itemCount})</span>}
        </SListTitle>
        {!isHost && (
          <SSelectWrapper>
            <Select
              value={selectedNumber}
              options={numberOptionList}
              onChange={value => setSelectedNumber(value)}
            />
          </SSelectWrapper>
        )}
      </SListHeader>
      {isHost && (
        <SSelectContainer>
          <SSelectWrapper>
            <Select
              value={selectedNumber}
              options={numberOptionList}
              onChange={value => setSelectedNumber(value)}
            />
          </SSelectWrapper>
          <div>
            <SSelectWrapper>
              <Select
                value={selectedApplicant}
                options={applicantOptionList}
                onChange={value => setSelectedApplicant(value)}
              />
            </SSelectWrapper>
            <SSelectWrapper>
              <Select
                value={selectedSort}
                options={sortOptionList}
                onChange={value => setSelectedSort(value)}
              />
            </SSelectWrapper>
          </div>
        </SSelectContainer>
      )}
      {invitation && invitation.apply?.length > 0 ? (
        invitation?.apply.map(application => (
          <ListItem key={id} application={application} isHost={isHost} />
        ))
      ) : (
        <SEmptyView>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyView>
      )}
      <SPaginationWrapper>
        <Pagination
          totalPagesLength={invitation?.meta?.pageCount}
          currentPageIndex={Number(page)}
          changeCurrentPage={setPage}
        />
      </SPaginationWrapper>
    </SInvitationPage>
  );
};

export default InvitationPage;

const SInvitationPage = styled(Box, {
  mt: '$100',
  mb: '$180',
});

const SListHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$64',
  mb: '$48',
  position: 'relative',
});

const SListTitle = styled(Box, {
  fontAg: '32_bold_100',
});

const SSelectContainer = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mb: '$16',
  position: 'relative',

  '& > div': {
    flexType: 'verticalCenter',
    gap: '$12',
  },
});

const SSelectWrapper = styled(Box, {
  '& button': {
    border: '1px solid $black40',
    backgroundColor: '$black100',
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
});

const SEmptyView = styled(Box, {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $black40`,
  fontAg: '24_medium_100',
  color: '$gray80',
});

const SPaginationWrapper = styled(Box, {
  mt: '$80',
});
