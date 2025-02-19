import Carousel from '@components/page/detail/Carousel';
import { styled } from 'stitches.config';
import {
  useMutationDeleteMeeting,
  useMutationPostApplication,
  useMutationDeleteApplication,
  useQueryGetMeeting,
} from '@api/API_LEGACY/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/@common/loader/Loader';
import InformationPanel from '@components/page/detail/Information/InformationPanel';
import { Tab } from '@headlessui/react';
import FeedPanel from '@components/page/detail/Feed/FeedPanel';
import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import MeetingController from '@components/page/detail/MeetingController';
import { useFlashByIdQuery } from '@api/flash/hook';
import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { GetFlashByIdResponse } from '@api/flash';
import KakaoFloatingButton from '@components/kakaoFloatingButton/KakaoFloatingButton';

dayjs.locale('ko');

const enum SelectedTab {
  INFORMATION,
  FEED,
}

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: meetingData } = useQueryGetMeeting({ params: { id } });
  const { data: flashData } = useFlashByIdQuery({ meetingId: +id });
  const { mutate: mutateDeleteMeeting } = useMutationDeleteMeeting({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});
  const { mutate: mutateDeleteApplication } = useMutationDeleteApplication({});
  const [selectedIndex, setSelectedIndex] = useState(SelectedTab.INFORMATION);

  if (!meetingData) {
    return (
      <>
        <Loader />
        <div style={{ position: 'fixed', bottom: '2%', right: '5%' }}>
          <KakaoFloatingButton />
        </div>
      </>
    );
  }
  const detailData: GetMeetingResponse | GetFlashByIdResponse = flashData || meetingData;

  return (
    <>
      <SDetailPage>
        <Carousel imageList={detailData?.imageURL} />
        <MeetingController
          detailData={detailData}
          mutateMeetingDeletion={mutateDeleteMeeting}
          mutateApplication={mutatePostApplication}
          mutateApplicationDeletion={mutateDeleteApplication}
        />
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

export default DetailPage;

const SDetailPage = styled('div', {
  mb: '$374',

  '@tablet': {
    mb: '$122',
  },
});

const STabList = styled('div', {
  display: 'flex',

  '@tablet': {
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
  },

  '@mobile': {
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

  '@tablet': {
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
        '@tablet': {
          borderWidth: '2px',
        },
      },
      false: {
        color: '$gray500',
        paddingBottom: '$28',
        '@tablet': {
          paddingBottom: '$18',
        },
      },
    },
  },
});
