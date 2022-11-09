import { Box } from '@components/box/Box';
import ListItem from '@components/page/groupInvitation/ListItem';
import { TabList } from '@components/tabList/TabList';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import GroupInformation from '@components/page/groupInvitation/GroupInformation';
import Pagination from '@components/page/groupList/Pagination';
import { usePageParams } from '@hooks/queryString/custom';
import Select from '@components/Form/Select';
import { useState } from 'react';
import { Option } from '@components/Form/Select/OptionItem';

type invitationItem = {
  id: number;
  profileImage?: string;
  name: string;
  date: string;
  status?: 'waiting' | 'accepted' | 'rejected';
  detail?: string;
};

const InvitationPage = () => {
  const router = useRouter();
  const handleChange = (text: string) => {
    if (text === 'all') {
      router.push('/');
    }
  };
  const { value: page, setValue: setPage } = usePageParams();
  const numberOptionList = [
    { label: '10명씩 보기', value: '10명씩 보기' },
    { label: '30명씩 보기', value: '30명씩 보기' },
    { label: '50명씩 보기', value: '50명씩 보기' },
  ];
  const applicantOptionList = [
    { label: '전체 신청자', value: '전체 신청자' },
    { label: '승인한 신청자', value: '승인한 신청자' },
    { label: '거절한 신청자', value: '거절한 신청자' },
  ];
  const sortOptionList = [
    { label: '최근 신청순', value: '최근 신청순' },
    { label: '오래된 신청순', value: '오래된 신청순' },
  ];
  const [selectedNumber, setSelectedNumber] = useState<Option>(
    numberOptionList[0]
  );
  const [selectedApplicant, setSelectedApplicant] = useState<Option>(
    applicantOptionList[0]
  );
  const [selectedSort, setSelectedSort] = useState<Option>(sortOptionList[0]);

  // 임시
  const isHost = false;
  const invitationList: invitationItem[] = [
    {
      id: 1,
      name: '백지연',
      date: '22.10.02',
      status: 'rejected',
      detail: '열심히 하겠습니다!',
    },
    {
      id: 2,
      name: '이재훈',
      date: '22.10.02',
      status: 'accepted',
      detail: '신청내역 상세',
    },
    {
      id: 3,
      name: '김은수',
      date: '22.10.02',
      status: 'waiting',
      detail: '모임에 임할 각오 작성',
    },
  ];
  const total = invitationList.length;

  return (
    <SInvitationPage>
      <TabList text="mine" size="big" onChange={handleChange}>
        <TabList.Item text="all">모임 전체</TabList.Item>
        <TabList.Item text="mine">내 모임</TabList.Item>
      </TabList>
      <GroupInformation />
      <SListTitle>
        모임 {isHost ? '신청자' : '참여자'}
        {total > 0 && <span> ({total})</span>}
      </SListTitle>
      {isHost && (
        <SSelectContainer>
          <Select
            value={selectedNumber}
            options={numberOptionList}
            onChange={value => setSelectedNumber(value)}
            type="invitation"
          />
          <div>
            <Select
              value={selectedApplicant}
              options={applicantOptionList}
              onChange={value => setSelectedApplicant(value)}
              type="invitation"
            />
            <Select
              value={selectedSort}
              options={sortOptionList}
              onChange={value => setSelectedSort(value)}
              type="invitation"
            />
          </div>
        </SSelectContainer>
      )}
      {invitationList.length ? (
        invitationList.map(invitation => (
          <ListItem key={invitation.id} {...invitation} isHost={isHost} />
        ))
      ) : (
        <SEmptyView>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyView>
      )}
      <SPaginationWrapper>
        <Pagination
          totalPagesLength={20}
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

const SListTitle = styled(Box, {
  mt: '$64',
  mb: '$48',
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
