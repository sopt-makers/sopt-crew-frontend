import { GetFlash } from '@api/flash/type';
import { GetMeeting } from '@api/meeting/type';
import Loader from '@common/loader/Loader';
import Carousel from '@domain/detail/Carousel';
import FeedPanel from '@domain/detail/Feed/FeedPanel';
import InformationPanel from '@domain/detail/Information/InformationPanel';
import MeetingController from '@domain/detail/MeetingController';
import { Tab } from '@headlessui/react';
import KakaoFloatingButton from '@shared/FloatingButton/kakaoFloatingButton/KakaoFloatingButton';
import { Fragment, useState } from 'react';
import { styled } from 'stitches.config';

type CommonDetailProps = {
  detailData: GetMeeting['response'] | GetFlash['response'];
};

const enum SelectedTab {
  INFORMATION,
  FEED,
}

// /detail 과 /detail/flash 에서 공통적으로 사용하는 컴포넌트
const CommonDetail = ({ detailData }: CommonDetailProps) => {
  const [selectedIndex, setSelectedIndex] = useState(SelectedTab.INFORMATION);

  if (!detailData) {
    return (
      <>
        <Loader />
        <div style={{ position: 'fixed', bottom: '2%', right: '5%' }}>
          <KakaoFloatingButton />
        </div>
      </>
    );
  }

  return (
    <>
      <SDetailPage>
        <Carousel imageList={detailData?.imageURL} />
        <MeetingController detailData={detailData} />
        <Tab.Group selectedIndex={selectedIndex} onChange={index => setSelectedIndex(index)}>
          <STabList>
            <Tab as={Fragment}>
              <STabButton isSelected={selectedIndex === SelectedTab.INFORMATION}>모임 안내</STabButton>
            </Tab>
            <Tab as={Fragment}>
              <STabButton isSelected={selectedIndex === SelectedTab.FEED}>피드</STabButton>
            </Tab>
          </STabList>
          <Tab.Panels>
            <Tab.Panel>
              <InformationPanel detailData={detailData} />
            </Tab.Panel>
            <Tab.Panel>
              <FeedPanel isMember={detailData?.approved || detailData?.host} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </SDetailPage>
      <div style={{ position: 'fixed', bottom: '2%', right: '5%' }}>
        <KakaoFloatingButton />
      </div>
    </>
  );
};

export default CommonDetail;

const SDetailPage = styled('div', {
  mb: '$374',

  '@media (max-width: 768px)': {
    mb: '$122',
  },
});

const STabList = styled('div', {
  display: 'flex',

  '@media (max-width: 768px)': {
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
  },

  '@media (max-width: 414px)': {
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
});

const STabButton = styled('button', {
  pb: '$24',
  mr: '$32',
  fontStyle: 'H1',
  color: '$gray500',

  '&:hover': {
    color: '$gray10',
  },

  '@media (max-width: 768px)': {
    fontStyle: 'T3',
    padding: '$16 0',
    mr: '$0',
    flex: '1',
    textAlign: 'center',
  },

  variants: {
    isSelected: {
      true: {
        color: '$gray10',
        borderBottom: `4px solid $gray10`,
        '@media (max-width: 768px)': {
          borderWidth: '2px',
        },
      },
      false: {
        color: '$gray500',
        paddingBottom: '$28',
        '@media (max-width: 768px)': {
          paddingBottom: '$18',
        },
      },
    },
  },
});
