import CardSkeleton from '@components/page/list/Card/Skeleton';
import Filter from '@components/page/list/Filter';
import GridLayout from '@components/page/list/Grid/Layout';
import { MeetingListOfAll } from '@components/page/list/Grid/List';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';
import CrewTab from '@components/CrewTab';

import FloatingButton from '@components/FloatingButton';
import KeywordsSettingButton from '@components/GuideButton';

const Home: NextPage = () => {
  return (
    <>
      <div>
        {/*크루 탭 - 홈, 전체 모임, 내모임, 모임 신청 가이드 */}
        <CrewTab>
          <KeywordsSettingButton />
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
      <FloatingButton />
    </>
  );
};

export default Home;

const SFilterWrapper = styled('div', {
  mt: '$45',
  mb: '$40',
  '@tablet': {
    mt: '$30',
  },
  '@mobile': {
    mb: '$28',
  },
});
