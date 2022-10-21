import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import { useState } from 'react';

function Detail() {
  const [selectedTab, setSelectedTab] = useState('introduction');
  const handleChange = (text: string) => {
    setSelectedTab(text);
  };

  return (
    <div>
      모임 상세 페이지
      <Tabs text={selectedTab} size={'small'} onChange={handleChange}>
        <Tab text={'introduction'}>모임 소개</Tab>
        <Tab text={'period'}>모임 기간</Tab>
        <Tab text={'method'}>진행 방식</Tab>
        <Tab text={'founder'}>개설자 소개</Tab>
        <Tab text={'target'}>모집 대상</Tab>
        <Tab text={'note'}>유의 사항</Tab>
      </Tabs>
    </div>
  );
}

export default Detail;
