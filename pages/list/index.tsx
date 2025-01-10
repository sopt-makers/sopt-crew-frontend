import { ampli } from '@/ampli';
import useNotices from '@api/notice/hooks';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import PlusIcon from '@assets/svg/plus.svg';
import WriteIcon from '@assets/svg/write.svg';
import ConfirmModal from '@components/modal/ConfirmModal';
import CardSkeleton from '@components/page/list/Card/Skeleton';
import Filter from '@components/page/list/Filter';
import Search from '@components/page/list/Filter/Search';
import GridLayout from '@components/page/list/Grid/Layout';
import { MeetingListOfAll } from '@components/page/list/Grid/List';
import NoticeSlider from '@components/page/list/Slider/NoticeSlider/NoticeSlider';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import useModal from '@hooks/useModal';
import { playgroundLink } from '@sopt-makers/playground-common';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from 'stitches.config';
import CrewTab from '@components/CrewTab';

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
        {/*크루 탭 - 홈, 전체 모임, 내모임, 모임 개설하기 */}
        <CrewTab>
          <SMobileButtonContainer>
            <WriteIcon onClick={handleMakeMeeting} className="make-button" />
            <Search.Mobile />
          </SMobileButtonContainer>
          <SMakeMeetingButton onClick={handleMakeMeeting}>
            <PlusIcon />
            <span>모임 개설하기</span>
          </SMakeMeetingButton>
        </CrewTab>

        {/*Notice 슬라이더*/}
        <SNoticeWrapper>
          <NoticeSlider notices={notices} />
        </SNoticeWrapper>

        {/*필터 - 필터, 모임 검색, 모임 신청 가이드, 필터 적용 후 생기는 FLEX 박스(chip 모임)*/}
        <SFilterWrapper>
          <Filter />
        </SFilterWrapper>

        {/*모임 목록들 - MeetingListOfAll : 내부적으로 쿼리 파라미터 이용하여 필터링 적용*/}
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
        data-color="mono"
        data-shape="pc"
        data-support-multiple-densities="true"
        style={{ position: 'fixed', bottom: '2%', right: '5%' }}
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
