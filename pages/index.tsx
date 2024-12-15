import { ampli } from '@/ampli';
import { useQueryGetGroupBrowsingCard } from '@api/API_LEGACY/meeting/hooks';
import { useInfinitePosts } from '@api/post/hooks';
import Carousel from '@components/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@components/groupBrowsingSlider/groupBrowsingSlider';
import DesktopFeedListSkeleton from '@components/page/detail/Feed/Skeleton/DesktopFeedListSkeleton';
import MobileFeedListSkeleton from '@components/page/detail/Feed/Skeleton/MobileFeedListSkeleton';
import QuickMenu from '@components/page/home/QuickMenu';
import FloatingButton from '@components/page/home/FloatingButton';
import { TabList } from '@components/tabList/TabList';
import { Flex } from '@components/util/layout/Flex';
import { TAKE_COUNT } from '@constants/feed';
import { useDisplay } from '@hooks/useDisplay';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';
import HomeCardList from '@components/page/home/HomeCardList';
import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';

const Home: NextPage = () => {
  const { isTablet } = useDisplay();

  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfinitePosts(TAKE_COUNT);

  const { data: groupBrowsingCardData } = useQueryGetGroupBrowsingCard();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div>
        <Flex align="start" justify="between">
          <TabList text="feedAll" size="big">
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
        </Flex>

        {isLoading &&
          (isTablet ? <MobileFeedListSkeleton count={3} /> : <DesktopFeedListSkeleton row={3} column={3} />)}

        {isTablet ? (
          <>
            <SContentTitle style={{ marginTop: '16px' }}>
              ⚡ ️솝트만의 일회성 모임, 번쩍
              <Link href="/list?category=번쩍&page=1">
                <SMoreButton>더보기 {'>'}</SMoreButton>
              </Link>
            </SContentTitle>
            {groupBrowsingCardData && <GroupBrowsingSlider cardList={groupBrowsingCardData}></GroupBrowsingSlider>}
            <SContentTitle style={{ marginBottom: '0px' }}>최신 피드</SContentTitle>
            <QuickMenu />
          </>
        ) : (
          <>
            <Flex align="center" justify="center">
              <SContentTitle style={{ marginTop: '54px' }}>
                ⚡ ️솝트만의 일회성 모임, 번쩍
                <Link href="/list?category=번쩍&page=1">
                  <SMoreButton>더보기 {'>'}</SMoreButton>
                </Link>
              </SContentTitle>
            </Flex>
            <GroupBrowsingCarouselContainer>
              <SGradationContainer>
                <SCarouselGradationRight />
                {groupBrowsingCardData && <Carousel cardList={groupBrowsingCardData} />}
              </SGradationContainer>
            </GroupBrowsingCarouselContainer>
            <SCarouselBlank />
            <Flex justify="center">
              {groupBrowsingCardData && (
                <div>
                  <HomeCardList
                    label="🔹 우리... 같이 솝커톤 할래?"
                    isMore
                    data={groupBrowsingCardData.slice(0, 3) as GroupBrowsingCardResponse}
                  />
                  <HomeCardList
                    label="🔥 지금 모집중인 모임"
                    data={groupBrowsingCardData.slice(0, 3) as GroupBrowsingCardResponse}
                  />
                  <HomeCardList
                    label="🍀 1차 행사 신청이 얼마 남지 않았어요!"
                    data={groupBrowsingCardData.slice(0, 3) as GroupBrowsingCardResponse}
                  />
                </div>
              )}
              <QuickMenu />
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
      </div>
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

  '@media (max-width: 850px)': {
    display: 'none',
  },

  '@tablet': {
    display: 'flex',
    width: '100%',
    fontSize: '16px',
  },
});

const SMoreButton = styled('button', {
  color: '$gray200',
  /* TODO: mds font 로 변환 */
  fontSize: '$14',
  fontWeight: '600',
  lineHeight: '$18',
  '@tablet': {
    fontSize: '$12',
  },

  '&:hover': {
    transition: 'background 0.1s ease-in-out',
    color: '$gray100',
  },

  '&:not(:hover)': {
    transition: 'background 0.1s ease-in-out',
    fill: '$gray100',
  },
});

const GroupBrowsingCarouselContainer = styled('div', {
  width: '100vw',
  position: 'absolute',
  left: '0',
  display: 'flex',
  justifyContent: 'center',

  '@media (max-width: 1259px)': {
    left: '-30px',
  },
});

const SCarouselBlank = styled('div', {
  paddingBottom: '252px',
  '@media (max-width: 850px)': {
    display: 'none',
  },
});

const SGradationContainer = styled('div', {
  position: 'relative',
});

const SCarouselGradationRight = styled('div', {
  width: '122px',
  height: '180px',
  background: 'linear-gradient(270deg, #0F0F12 0%, rgba(15, 15, 18, 0.00) 100%)',

  position: 'absolute',
  zIndex: 1,
  right: '0',
  pointerEvents: 'none',
  marginRight: '55px',

  '@media (max-width: 850px)': {
    display: 'none',
  },

  '@media (min-width: 1259px)': {
    display: 'none',
  },
});
