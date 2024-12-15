import { TabList } from '@components/@common/tabList/TabList';
import { styled } from 'stitches.config';
import { useDisplay } from '@hooks/useDisplay';
import { parseTextToLink } from '@components/util/parseTextToLink';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import { PART_NAME } from '@constants/option';
import { useCallback, useRef, useState } from 'react';
import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { Chip } from '@sopt-makers/ui';

interface InformationPanelProps {
  detailData: GetMeetingResponse;
}

const InformationPanel = ({ detailData }: InformationPanelProps) => {
  const { isMobile } = useDisplay();
  const tabRef = useRef<HTMLElement[]>([]);
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: detailData?.desc,
    },
    {
      id: 1,
      title: '활동 기간',
      content: `${dayjs(detailData?.mStartDate ?? '').format('YYYY.MM.DD (ddd)')} ~ ${dayjs(
        detailData?.mEndDate ?? ''
      ).format('YYYY.MM.DD (ddd)')}`,
    },
    {
      id: 2,
      title: '진행 방식',
      content: detailData?.processDesc,
    },
    {
      id: 3,
      title: '모집 대상',
      generation: detailData?.canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수',
      partList: detailData?.joinableParts?.map(key => PART_NAME[key]),
      //'이런 사람을 찾아요' Input이 사라지면서 해당 객체의 content는 삭제 됨
      //렌더링은 되어야하므로 truthy값으로 문자열 'NULL'을 삽입
      content: 'NULL',
    },
    {
      id: 4,
      title: '개설자 소개',
      content: detailData?.leaderDesc,
    },
    {
      id: 5,
      title: '유의사항',
      content: detailData?.note,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(detailList[0].title);

  const handleChange = useCallback((text: string) => {
    setSelectedTab(text);
    tabRef.current[detailList.findIndex(item => item.title === text)].scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleContent = (content: string) => {
    if (content === 'NULL') return;
    return parseTextToLink(content);
  };

  return (
    <SInformationPanel>
      {isMobile && (
        <TabList text={selectedTab} size="small" onChange={handleChange}>
          {detailList.map(
            ({ id, title, content }) =>
              content && (
                <TabList.Item key={id} text={title}>
                  {title}
                </TabList.Item>
              )
          )}
        </TabList>
      )}
      {detailList.map(
        ({ id, title, generation, partList, content }) =>
          content && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <SDetail key={id} ref={element => (tabRef.current[id] = element!)}>
              <STitle>{title}</STitle>
              {title === '모집 대상' && (
                <STarget>
                  {partList?.map(part => (
                    <Chip key={part} style={{ width: '80px', boxShadow: 'none' }} active>
                      {part}
                    </Chip>
                  ))}
                  {generation}
                </STarget>
              )}
              <SDescription>{handleContent(content)}</SDescription>
            </SDetail>
          )
      )}
    </SInformationPanel>
  );
};

export default InformationPanel;

const SInformationPanel = styled('div', {
  '@tablet': {
    mt: '$8',
  },
});

const SDetail = styled('section', {
  scrollMarginTop: '$80',
  color: '$gray10',
  mt: '$120',

  '@tablet': {
    mt: '$56',
  },
});

const STitle = styled('h2', {
  fontAg: '24_bold_100',
  mb: '$24',

  '@tablet': {
    fontStyle: 'H4',
    mb: '$20',
  },
});

const SDescription = styled('p', {
  fontAg: '22_regular_170',
  whiteSpace: 'pre-line',
  color: '$gray200',

  a: {
    textDecoration: 'underline',
    wordBreak: 'break-all',
  },

  '@tablet': {
    fontStyle: 'B3',
  },
});

const STarget = styled(SDescription, {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
  color: '$gray10',
  flexWrap: 'wrap',

  mb: '$24',

  '@tablet': {
    mb: '$20',
  },
});
