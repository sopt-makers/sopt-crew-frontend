import { Box } from '@components/box/Box';
import ListItem from '@components/page/groupInvitation/ListItem';
import { TabList } from '@components/tabList/TabList';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

const InvitationPage = () => {
  const router = useRouter();
  const handleChange = (text: string) => {
    if (text === 'all') {
      router.push('/group');
    }
  };

  // 임시
  const isHost = true;
  const invitationList = [
    {
      id: '1',
      name: '백지연',
      date: '22.10.02',
      status: 'rejected',
    },
    {
      id: '2',
      name: '이재훈',
      date: '22.10.02',
      status: 'accepted',
    },
    {
      id: '3',
      name: '김은수',
      date: '22.10.02',
      status: 'waiting',
    },
  ];

  return (
    <div>
      <TabList text="mine" size="big" onChange={handleChange}>
        <TabList.Item text="all">모임 전체</TabList.Item>
        <TabList.Item text="mine">내 모임</TabList.Item>
      </TabList>
      <SListTitle>모임 {isHost ? '신청자' : '참여자'} 리스트</SListTitle>
      {invitationList.map(invitation => (
        <ListItem key={invitation.id} {...invitation} isHost={isHost} />
      ))}
    </div>
  );
};

export default InvitationPage;

const SListTitle = styled(Box, {
  marginTop: '$96',
  marginBottom: '$64',
  fontAg: '32_bold_100',
});
