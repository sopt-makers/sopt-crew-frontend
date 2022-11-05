import { Box } from '@components/box/Box';
import Card from '@components/page/groupList/Card';
import Filter from '@components/page/groupList/filter/Filter';
import GridLayout from '@components/page/groupList/GirdLayout';
import Pagination from '@components/page/groupList/Pagination';
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
        <Box css={{ mt: '$120', mb: '$64' }}>
          <Filter />
        </Box>
        <GridLayout>
          <Card />
          <Card />
          <Card />
          <Card />
        </GridLayout>
        <Box css={{ my: '$80' }}>
          <Pagination />
        </Box>
      </main>
    </div>
  );
};

export default Home;
