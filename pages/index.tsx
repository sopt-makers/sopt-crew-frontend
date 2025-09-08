import { useFlashListQueryOption } from '@api/flash/query';
import { useGetPostListInfiniteQuery } from '@api/post/query';
import { TAKE_COUNT } from '@constant/feed';
import DesktopFeedListSkeleton from '@domain/detail/Feed/Skeleton/DesktopFeedListSkeleton';
import MobileFeedListSkeleton from '@domain/detail/Feed/Skeleton/MobileFeedListSkeleton';
import HomeCardList from '@domain/home/HomeCardList';
import QuickMenu from '@domain/home/QuickMenu';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import Carousel from '@shared/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@shared/groupBrowsingSlider/groupBrowsingSlider';
import GuideButton from '@shared/GuideButton';
import { Flex } from '@shared/util/layout/Flex';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const { isLaptop, isTablet, isMobile } = useDisplay();

  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetPostListInfiniteQuery(TAKE_COUNT);

  const flashList = useQuery(useFlashListQueryOption()).data?.meetings;

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
      {isLoading && (isTablet ? <MobileFeedListSkeleton count={3} /> : <DesktopFeedListSkeleton row={3} column={3} />)}
      {isMobile ? (
        <>
          <SContentTitle style={{ marginTop: '16px' }}>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          {flashList && <GroupBrowsingSlider cardList={flashList}></GroupBrowsingSlider>}
        </>
      ) : (
        <>
          <Flex align="center" justify="center">
            <SContentTitle style={{ marginTop: '54px' }}>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          </Flex>
          <GroupBrowsingCarouselContainer>
            {flashList && <Carousel cardList={flashList} />}
          </GroupBrowsingCarouselContainer>
        </>
      )}
      {isLaptop ? (
        <Flex direction="column" justify="center" align="center">
          <QuickMenuWrapper>
            <QuickMenu />
          </QuickMenuWrapper>
          <HomeCardList />
        </Flex>
      ) : (
        <>
          <Flex justify="between" style={{ marginTop: '72px' }}>
            <HomeCardList />
            <div style={{ paddingLeft: '106px' }}>
              <QuickMenu />
            </div>
          </Flex>
        </>
      )}

      {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
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

  '@laptop': {
    width: '790px',
  },

  '@mobile': {
    display: 'flex',
    width: '100%',
    fontSize: '16px',
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
