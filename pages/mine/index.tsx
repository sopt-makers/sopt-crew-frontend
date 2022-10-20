import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import { useRouter } from 'next/router';

function Mine() {
  const router = useRouter();
  const handleChange = (text: string) => {
    router.push(text === 'all' ? '/' : text);
  };

  return (
    <div>
      <Tabs text={'mine'} onChange={handleChange}>
        <Tab text={'all'}>모임 전체</Tab>
        <Tab text={'mine'}>내 모임</Tab>
      </Tabs>
      <div>내가 만든 모임</div>
      <div>내가 신청한 모임</div>
    </div>
  );
}

export default Mine;
