import { ampli } from '@/ampli';
import useNotices from '@api/notice/hooks';
import { useQueryMyProfile } from '@api/user/hooks';
import PlusIcon from '@assets/svg/plus.svg';
import WriteIcon from '@assets/svg/write.svg';
import ConfirmModal from '@components/modal/ConfirmModal';
import CardSkeleton from '@components/page/meetingList/Card/Skeleton';
import Filter from '@components/page/meetingList/Filter';
import Search from '@components/page/meetingList/Filter/Search';
import GridLayout from '@components/page/meetingList/Grid/Layout';
import { MeetingListOfAll } from '@components/page/meetingList/Grid/List';
import NoticeSlider from '@components/page/meetingList/Slider/NoticeSlider/NoticeSlider';
import { TabList } from '@components/tabList/TabList';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { Flex } from '@components/util/layout/Flex';
import useModal from '@hooks/useModal';
import { playgroundLink } from '@sopt-makers/playground-common';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: me } = useQueryMyProfile();
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { data: notices } = useNotices();

  const handleMakeMeeting = () => {
    if (!me?.hasActivities) {
      handleModalOpen();
      return;
    }
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make');
  };

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

  return (
    <>
      <div>
        <Flex align="start" justify="between">
          <TabList text="groupAll" size="big">
            <Link href="/" onClick={() => ampli.clickNavbarGroup({ menu: '피드' })}>
              <TabList.Item text="feedAll">홈</TabList.Item>
            </Link>
            <Link href="/list" onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
              <TabList.Item text="groupAll">전체 모임</TabList.Item>
            </Link>
            <Link href="/mine" onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
              <TabList.Item text="mine">내 모임</TabList.Item>
            </Link>
          </TabList>
          <SMobileButtonContainer>
            <WriteIcon onClick={handleMakeMeeting} className="make-button" />
            <Search.Mobile />
          </SMobileButtonContainer>
          <SMakeMeetingButton onClick={handleMakeMeeting}>
            <PlusIcon />
            <span>모임 개설하기</span>
          </SMakeMeetingButton>
        </Flex>
        <SNoticeWrapper>
          <NoticeSlider notices={notices} />
        </SNoticeWrapper>
        <SFilterWrapper>
          <Filter />
        </SFilterWrapper>
        <SSRSafeSuspense
          fallback={
            <GridLayout mobileType="list">
              {new Array(6).fill(null).map((_, index) => (
                <CardSkeleton key={index} mobileType="list" />
              ))}
            </GridLayout>
          }
        >
          <MeetingListOfAll />
        </SSRSafeSuspense>
      </div>
      <ConfirmModal
        isModalOpened={isModalOpened}
        message={`모임을 개설하려면\n프로필 작성이 필요해요`}
        cancelButton="돌아가기"
        confirmButton="작성하기"
        handleModalClose={handleModalClose}
        handleConfirm={() => (window.location.href = `${playgroundLink.memberUpload()}`)}
      />
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

export default Home;

const SMakeMeetingButton = styled('button', {
  flexType: 'verticalCenter',
  padding: '$16 $24 $16 $20',
  background: '$gray10',
  borderRadius: '16px',
  '& > span': {
    ml: '$12',
    fontAg: '18_bold_100',
    color: '$gray950',
  },
  '@tablet': {
    display: 'none',
  },
});

const SMobileButtonContainer = styled('div', {
  display: 'none',
  '@tablet': {
    flexType: 'verticalCenter',
    gap: '16px',
  },
  svg: {
    cursor: 'pointer',
  },
});

const SFilterWrapper = styled('div', {
  mt: '$40',
  mb: '$64',
  '@tablet': {
    mt: '$32',
    mb: '$24',
  },
});

const SNoticeWrapper = styled('div', {
  mt: '$64',
  '@tablet': {
    mt: '$28',
  },
});
