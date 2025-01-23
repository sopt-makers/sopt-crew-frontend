import { TabList } from '@components/@common/tabList/TabList';
import { styled } from 'stitches.config';
import { useDisplay } from '@hooks/useDisplay';
import { useCallback, useRef, useState } from 'react';
import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { LightningDetailList, MeetingDetailList } from '@components/page/detail/Information/constant';
import { GetLightningByIdResponse } from '@api/lightning';

interface InformationPanelProps {
  detailData: GetMeetingResponse | GetLightningByIdResponse;
}

const InformationPanel = ({ detailData }: InformationPanelProps) => {
  const { isMobile } = useDisplay();
  const tabRef = useRef<HTMLElement[]>([]);
  const detailList =
    detailData.category === '번쩍'
      ? LightningDetailList(detailData as GetLightningByIdResponse)
      : MeetingDetailList(detailData as GetMeetingResponse);
  const [selectedTab, setSelectedTab] = useState(detailList[0]?.key);

  const handleChange = useCallback((text: string) => {
    setSelectedTab(text);
    tabRef.current[detailList.findIndex(item => item.key === text)]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <SInformationPanel>
      {isMobile && (
        <TabList text={selectedTab ?? ''} size="small" onChange={handleChange}>
          {detailList.map(
            ({ key, Title, isValid }) =>
              isValid && (
                <TabList.Item key={key} text={key}>
                  <Title />
                </TabList.Item>
              )
          )}
        </TabList>
      )}
      {detailList.map(
        ({ key, Title, Content, isValid }, idx) =>
          isValid && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <SDetail key={key} ref={element => (tabRef.current[idx] = element!)}>
              <Title />
              <Content />
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
