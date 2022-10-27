import ListItem from '@components/page/groupInvitation/ListItem';
import { TabList } from '@components/tabList/TabList';
import { useRouter } from 'next/router';

const InvitationPage = () => {
  const router = useRouter();
  const handleChange = (text: string) => {
    if (text === 'all') {
      router.push('/group');
    }
  };

  // 임시
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
      {invitationList.map(invitation => (
        <ListItem key={invitation.id} {...invitation} />
      ))}
    </div>
  );
};

export default InvitationPage;
