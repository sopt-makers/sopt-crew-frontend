import { ampli } from '@/ampli';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import ConfirmModal from '@components/modal/ConfirmModal';
import CardSkeleton from '@components/page/list/Card/Skeleton';
import Filter from '@components/page/list/Filter';
import GridLayout from '@components/page/list/Grid/Layout';
import { MeetingListOfAll } from '@components/page/list/Grid/List';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import useModal from '@hooks/useModal';
import { playgroundLink } from '@sopt-makers/playground-common';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import CrewTab from '@components/CrewTab';

import FloatingButton from '@components/FloatingButton';
import GuideButton from '@components/GuideButton';

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
          <GuideButton />
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
  '@mobile': {
    mb: '$28',
  },
});
