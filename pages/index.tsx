import { useFlashListQuery } from '@api/flash/hook';
import { useInfinitePosts } from '@api/post/hooks';
import CrewTab from '@components/CrewTab';
import FloatingButton from '@components/FloatingButton';
import Carousel from '@components/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@components/groupBrowsingSlider/groupBrowsingSlider';
import GuideButton from 'src/components/KeywordsSettingButton';
import DesktopFeedListSkeleton from '@components/page/detail/Feed/Skeleton/DesktopFeedListSkeleton';
import MobileFeedListSkeleton from '@components/page/detail/Feed/Skeleton/MobileFeedListSkeleton';
import HomeCardList from '@components/page/home/HomeCardList';
import QuickMenu from '@components/page/home/QuickMenu';
import { Flex } from '@components/util/layout/Flex';
import { TAKE_COUNT } from '@constants/feed';
import { useDisplay } from '@hooks/useDisplay';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const { isLaptop, isTablet, isMobile } = useDisplay();

  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfinitePosts(TAKE_COUNT);

  const flashList = useFlashListQuery().data?.meetings;

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
          <Flex justify="center" style={{ marginTop: '72px' }}>
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
