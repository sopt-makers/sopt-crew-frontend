import Carousel from '@components/page/meetingDetail/Carousel';
import { styled } from 'stitches.config';
import {
  useMutationDeleteMeeting,
  useMutationPostApplication,
  useMutationDeleteApplication,
  useQueryGetMeeting,
} from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/loader/Loader';
import InformationPanel from '@components/page/meetingDetail/Information/InformationPanel';
import { Tab } from '@headlessui/react';
import FeedPanel from '@components/page/meetingDetail/Feed/FeedPanel';
import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ERecruitmentStatus } from '@constants/option';
import MeetingController from '@components/page/meetingDetail/MeetingController';

dayjs.locale('ko');

const enum SelectedTab {
  FEED,
  INFORMATION,
}

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: detailData } = useQueryGetMeeting({ params: { id } });
  const { mutate: mutateDeleteMeeting } = useMutationDeleteMeeting({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});
  const { mutate: mutateDeleteApplication } = useMutationDeleteApplication({});
  const [selectedIndex, setSelectedIndex] = useState(SelectedTab.INFORMATION);

  useEffect(() => {
    if (detailData) {
      setSelectedIndex(detailData.status === ERecruitmentStatus.OVER ? SelectedTab.FEED : SelectedTab.INFORMATION);
    }
  }, [detailData]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    try {
      if (window.Kakao) {
        window?.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_TALK_PLUGIN_KEY);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
    window.Kakao?.Channel.createChatButton({
      container: '#chat-channel-button',
      channelPublicId: '_sxaIWG',
    });
    document.body.appendChild(script);
    document.body.removeChild(script);
  }, []);

  if (!detailData) {
    return (
      <>
        <Loader />
        <div
          id="chat-channel-button"
          data-channel-public-id="_sxaIWG"
          data-title="question"
          data-size="small"
          data-color="yellow"
          data-shape="pc"
          data-support-multiple-densities="true"
          style={{ position: 'fixed', bottom: '5%', right: '5%' }}
        />
      </>
    );
  }

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
              <STabButton isSelected={selectedIndex === SelectedTab.FEED}>피드</STabButton>
            </Tab>
            <Tab as={Fragment}>
              <STabButton isSelected={selectedIndex === SelectedTab.INFORMATION}>모임 안내</STabButton>
            </Tab>
          </STabList>
          <Tab.Panels>
            <Tab.Panel>
              <FeedPanel isMember={detailData?.approved || detailData?.host} />
            </Tab.Panel>
            <Tab.Panel>
              <InformationPanel detailData={detailData} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </SDetailPage>
      <div
        id="chat-channel-button"
        data-channel-public-id="_sxaIWG"
        data-title="question"
        data-size="small"
        data-color="yellow"
        data-shape="pc"
        data-support-multiple-densities="true"
        style={{ position: 'fixed', bottom: '5%', right: '5%' }}
      />
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
