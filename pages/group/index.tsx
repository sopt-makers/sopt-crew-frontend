import { TabList } from '@components/tabList/TabList';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const handleChange = (text: string) => {
    setSelectedTab(text);
  };

  return (
    <div>
      <main>
        main 페이지
        <TabList text={selectedTab} size="big" onChange={handleChange}>
          <TabList.Item text="all">모임 전체</TabList.Item>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </TabList>
        <div style={{ height: '300px' }} />
      </main>
    </div>
  );
};

export default Home;
