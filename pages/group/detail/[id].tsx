import { Box } from '@components/box/Box';
import Tab from '@components/tabs/Tab';
import Tabs from '@components/tabs/Tabs';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';

function Detail() {
  const tabRef = useRef(new Array());
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: '내용',
    },
    {
      id: 1,
      title: '모임 기간',
      content: '내용',
    },
    {
      id: 2,
      title: '진행 방식',
      content: '내용',
    },
    {
      id: 3,
      title: '개설자 소개',
      content: '내용',
    },
    {
      id: 4,
      title: '모집 대상',
      content: '내용',
    },
    {
      id: 5,
      title: '유의사항',
      content: '내용',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(detailList[0].title);

  const handleChange = (text: string) => {
    setSelectedTab(text);
    tabRef.current[
      detailList.findIndex(item => item.title === text)
    ].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Tabs text={selectedTab} size={'small'} onChange={handleChange}>
        {detailList.map(({ id, title }) => (
          <Tab key={id} text={title}>
            {title}
          </Tab>
        ))}
      </Tabs>
      {detailList.map(({ id, title, content }) => (
        <SDetail key={id} ref={element => (tabRef.current[id] = element)}>
          <STitle>{title}</STitle>
          <SContent>{content}</SContent>
        </SDetail>
      ))}
    </div>
  );
}

export default Detail;

const SDetail = styled(Box, {
  color: '$white',
  marginTop: '$120',
});

const STitle = styled(Box, {
  fontAg: '24_bold_100',
  marginBottom: '$24',
});

const SContent = styled(Box, {
  fontSize: '$22',
  lineHeight: '37.4px',
});
