import GroupInformation from '@components/page/groupInvitation/GroupInformation';
import { TabList } from '@components/tabList/TabList';
import { useRouter } from 'next/router';

const InvitationPage = () => {
  const router = useRouter();
  const handleChange = (text: string) => {
    if (text === 'all') {
      router.push('/group');
    }
  };

  return (
    <div>
      <TabList text="mine" size="big" onChange={handleChange}>
        <TabList.Item text="all">모임 전체</TabList.Item>
        <TabList.Item text="mine">내 모임</TabList.Item>
      </TabList>
      <GroupInformation />
    </div>
  );
};

export default InvitationPage;
