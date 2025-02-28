import { ampli } from '@/ampli';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import WriteIcon from '@assets/svg/write.svg';
import ConfirmModal from '@components/modal/ConfirmModal';
import CardSkeleton from '@components/page/list/Card/Skeleton';
import Filter from '@components/page/list/Filter';
import Search from '@components/page/list/Filter/Search';
import GridLayout from '@components/page/list/Grid/Layout';
import { MeetingListOfAll } from '@components/page/list/Grid/List';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import useModal from '@hooks/useModal';
import { playgroundLink } from '@sopt-makers/playground-common';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import CrewTab from '@components/CrewTab';

import ArrowRightCircleIcon from '@assets/svg/arrow_right_circle.svg';
import FloatingButton from '@components/page/list/FloatingButton';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: me } = useQueryMyProfile();
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();

  const handleMakeMeeting = () => {
    if (!me?.hasActivities) {
      handleModalOpen();
      return;
    }
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make');
  };

  return (
    <>
      <div>
        {/*크루 탭 - 홈, 전체 모임, 내모임, 모임 신청 가이드 */}
        <CrewTab>
          <SGuideButton
            target="_blank"
            href="https://www.notion.so/sopt-makers/eec46a4562ec48f0b0220153bb6ea68e"
            rel="noreferrer noopener"
          >
            모임 신청 가이드
            <ArrowRightCircleIcon />
          </SGuideButton>
        </CrewTab>

        {/*필터 - 드롭다운, 모임 검색*/}
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

      <FloatingButton />
    </>
  );
};

export default Home;

const SFilterWrapper = styled('div', {
  mt: '$45',
  mb: '$40',
  '@tablet': {
    mt: '$16',
  },
});

const SGuideButton = styled('a', {
  height: '$48',
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$gray10',
  padding: '$18 $20',
  borderRadius: '14px',
  fontAg: '18_semibold_100',
  boxSizing: 'border-box',
  '@tablet': {
    padding: '$14 $12 $14 $16',
    borderRadius: '10px',
    fontAg: '14_medium_100',
  },

  path: {
    stroke: '$gray10',
  },
});
