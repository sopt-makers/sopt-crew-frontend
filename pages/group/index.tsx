import Select from '@components/Form/Select';
import { Option } from '@components/Form/Select/types';
import { TabList } from '@components/tabList/TabList';
import type { NextPage } from 'next';
import { useState } from 'react';

const options = [
  {
    id: 1,
    label: 'Durward Reynolds',
    value: 'Durward Reynolds',
  },
  { id: 2, label: 'Kenton Towne', value: 'Kenton Towne' },
  {
    id: 3,
    label: 'Therese Wunsch',
    value: 'Therese Wunsch',
  },
  {
    id: 4,
    label: 'Benedict Kessler',
    value: 'Benedict Kessler',
  },
  { id: 5, label: 'Katelyn Rohan', value: 'Katelyn Rohan' },
];

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const handleChange = (text: string) => {
    setSelectedTab(text);
  };

  const handleSelect = (value: Option) => {
    console.log(value);
    setSelectedOption(value);
  };

  return (
    <div>
      <main>
        main 페이지
        <TabList text={selectedTab} size="big" onChange={handleChange}>
          <TabList.Item text="all">모임 전체</TabList.Item>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </TabList>
        <Select
          label="모임 카테고리"
          required
          value={selectedOption}
          options={options}
          onChange={handleSelect}
        />
      </main>
    </div>
  );
};

export default Home;
