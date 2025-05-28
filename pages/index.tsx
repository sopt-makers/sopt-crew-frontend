import { useInfinitePosts } from '@api/post/hooks';
import Carousel from '@components/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@components/groupBrowsingSlider/groupBrowsingSlider';
import DesktopFeedListSkeleton from '@components/page/detail/Feed/Skeleton/DesktopFeedListSkeleton';
import MobileFeedListSkeleton from '@components/page/detail/Feed/Skeleton/MobileFeedListSkeleton';
import QuickMenu from '@components/page/home/QuickMenu';
import FloatingButton from '@components/FloatingButton';
import { Flex } from '@components/util/layout/Flex';
import { TAKE_COUNT } from '@constants/feed';
import { useDisplay } from '@hooks/useDisplay';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';
import CrewTab from '@components/CrewTab';
import HomeCardList from '@components/page/home/HomeCardList';
import { useGetRecommendMeetingListQuery } from '@api/meeting/hook';
import { useFlashListQuery } from '@api/flash/hook';
import GuideButton from '@components/GuideButton';
import { fontsObject } from '@sopt-makers/fonts';

const Home: NextPage = () => {
  const { isNewLaptop, isNewTablet, isNewMobile } = useDisplay();

  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfinitePosts(TAKE_COUNT);

  const flashList = useFlashListQuery().data?.meetings;
  const { data: inProgressMeetings } = useGetRecommendMeetingListQuery({ meetingIds: [] });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <CrewTab>
        <GuideButton />
      </CrewTab>
      {isLoading &&
        (isNewTablet ? <MobileFeedListSkeleton count={3} /> : <DesktopFeedListSkeleton row={3} column={3} />)}
      {isNewMobile ? (
        <>
          <SContentTitle>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          {flashList && <GroupBrowsingSlider cardList={flashList}></GroupBrowsingSlider>}
        </>
      ) : (
        <>
          <Flex align="center" justify="center">
            <SContentTitle>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          </Flex>
          <GroupBrowsingCarouselContainer>
            {flashList && <Carousel cardList={flashList} />}
          </GroupBrowsingCarouselContainer>
        </>
      )}
      {isNewLaptop ? (
        <Flex direction="column" justify="center" align="center">
          <QuickMenuWrapper>
            <QuickMenu />
          </QuickMenuWrapper>
          {inProgressMeetings && <HomeCardList inProgressMeetingData={inProgressMeetings} />}
        </Flex>
      ) : (
        <>
          <Flex justify="center" style={{ marginTop: '72px', gap: '16px' }}>
            {inProgressMeetings && <HomeCardList inProgressMeetingData={inProgressMeetings} />}
            <div style={{ paddingLeft: '106px' }}>
              <QuickMenu />
            </div>
          </Flex>
        </>
      )}

      {isFetchingNextPage && isNewTablet && <MobileFeedListSkeleton count={3} />}
      {!isFetchingNextPage && hasNextPage ? (
        <div ref={ref} style={{ height: '1px' }} />
      ) : (
        <div style={{ height: '1px' }} />
      )}

      <FloatingButton />
    </>
  );
};

export default Home;

const SContentTitle = styled('div', {
  fontStyle: 'H1',
  color: '$white',
  mb: '$20',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '1200px',
  marginTop: '45px',

  '@mobile': {
    marginTop: '30px',
  },

  '@laptop': {
    width: '790px',
  },

  '@tablet': {
    ...fontsObject.HEADING_4_24_B,
    display: 'flex',
    width: '100%',
    marginTop: '28px',
  },
});

const GroupBrowsingCarouselContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

const QuickMenuWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  margin: '$60 0 $72',

  '@tablet': {
    margin: '$40 0',
  },
});
