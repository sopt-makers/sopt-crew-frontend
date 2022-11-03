import { Box } from '@components/box/Box';
import ListItem from '@components/page/groupInvitation/ListItem';
import { TabList } from '@components/tabList/TabList';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import GroupInformation from '@components/page/groupInvitation/GroupInformation';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';

type invitationItem = {
  id: number;
  profileImage?: string;
  name: string;
  date: string;
  status?: 'waiting' | 'accepted' | 'rejected';
};

const InvitationPage = () => {
  const { isModalOpened, handleOpenModal, handleCloseModal } = useModal();
  const router = useRouter();
  const handleChange = (text: string) => {
    if (text === 'all') {
      router.push('/group');
    }
  };

  // 임시
  const isHost = true;
  const invitationList: invitationItem[] = [
    {
      id: 1,
      name: '백지연',
      date: '22.10.02',
      status: 'rejected',
    },
    {
      id: 2,
      name: '이재훈',
      date: '22.10.02',
      status: 'accepted',
    },
    {
      id: 3,
      name: '김은수',
      date: '22.10.02',
      status: 'waiting',
    },
  ];

  return (
    <>
      <SInvitationPage>
        <TabList text="mine" size="big" onChange={handleChange}>
          <TabList.Item text="all">모임 전체</TabList.Item>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </TabList>
        <GroupInformation />
        <SListTitle>모임 {isHost ? '신청자' : '참여자'} 리스트</SListTitle>
        {invitationList.length ? (
          invitationList.map(invitation => (
            <ListItem key={invitation.id} {...invitation} isHost={isHost} handleOpenModal={handleOpenModal} />
          ))
        ) : (
          <SEmptyView>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyView>
        )}
      </SInvitationPage>
      {isModalOpened && (
        <DefaultModal
          width="641px"
          title="신청내역 상세 보기"
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default InvitationPage;

const SInvitationPage = styled(Box, {
  mt: '$100',
  mb: '$180',
});

const SListTitle = styled(Box, {
  mt: '$96',
  mb: '$64',
  fontAg: '32_bold_100',
});

const SEmptyView = styled(Box, {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $black40`,
  fontAg: '24_medium_100',
  color: '$gray80',
});
