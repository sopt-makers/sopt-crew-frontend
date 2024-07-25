import { ampli } from '@/ampli';
import { useQueryGetGroupBrowsingCard } from '@api/API_LEGACY/meeting/hooks';
import { useInfinitePosts, useMutationUpdateLike } from '@api/post/hooks';
import LikeButton from '@components/button/LikeButton';
import Carousel from '@components/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@components/groupBrowsingSlider/groupBrowsingSlider';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import MeetingInfo from '@components/page/meetingDetail/Feed/FeedItem/MeetingInfo';
import DesktopFeedListSkeleton from '@components/page/meetingDetail/Feed/Skeleton/DesktopFeedListSkeleton';
import MobileFeedListSkeleton from '@components/page/meetingDetail/Feed/Skeleton/MobileFeedListSkeleton';
import FloatingButton from '@components/page/postList/FloatingButton';
import { TabList } from '@components/tabList/TabList';
import { Flex } from '@components/util/layout/Flex';
import { TAKE_COUNT } from '@constants/feed';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useDisplay } from '@hooks/useDisplay';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const { isMobile, isTablet } = useDisplay();
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data: postsData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfinitePosts(TAKE_COUNT);

  const { mutate: mutateLikeInAllPost } = useMutationUpdateLike(TAKE_COUNT);

  const { data: groupBrowsingCardData } = useQueryGetGroupBrowsingCard();

  const handleClickLike =
    (postId: number) => (mutateCb: (postId: number) => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      ampli.clickFeedlistLike({ location: router.pathname });
      mutateCb(postId);
    };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const renderedPosts = postsData?.pages.map(post => {
    if (!post) return;
    return (
      <Link href={`/post?id=${post?.id}`} key={post?.id}>
        <FeedItem
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */
          post={post}
          LikeButton={
            <LikeButton
              isLiked={post.isLiked}
              likeCount={post.likeCount}
              onClickLike={handleClickLike(post.id)(mutateLikeInAllPost)}
            />
          }
          onClick={() =>
            ampli.clickFeedCard({
              feed_id: post.id,
              feed_upload: post.updatedDate,
              feed_title: post.title,
              feed_image_total: post.images ? post.images.length : 0,
              feed_comment_total: post.commentCount,
              feed_like_total: post.likeCount,
              group_id: post.meeting.id,
              platform_type: isMobile ? 'MO' : 'PC',
              location: router.pathname,
            })
          }
          HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
        />
      </Link>
    );
  });

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
              모임 둘러보기
              <Link href="/list">
                <SMoreButton>더보기 {'>'}</SMoreButton>
              </Link>
            </SContentTitle>
            {groupBrowsingCardData && <GroupBrowsingSlider cardList={groupBrowsingCardData}></GroupBrowsingSlider>}
            <SContentTitle style={{ marginBottom: '0px' }}>최신 피드</SContentTitle>
            <SMobileContainer>{renderedPosts}</SMobileContainer>
          </>
        ) : (
          <>
            <Flex align="center" justify="center">
              <SContentTitle style={{ marginTop: '54px' }}>
                모임 둘러보기
                <Link href="/list">
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
            <Flex align="center" justify="center">
              <SContentTitle style={{ marginBottom: '0px' }}>최신 피드</SContentTitle>
            </Flex>
            <SDesktopContainer align="center" gap={30}>
              {renderedPosts}
            </SDesktopContainer>
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

const SDesktopContainer = styled(MasonryInfiniteGrid, {
  margin: '$20 0',
  a: {
    width: '380px',
  },
});

const SMobileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  '& a:not(:first-child)::before': {
    content: '',
    display: 'none',

    '@tablet': {
      display: 'block',
      width: '100vw',
      height: '8px',
      marginLeft: 'calc(50% - 50vw)',
      background: '$gray800',
    },
  },
});

const SContentTitle = styled('div', {
  fontStyle: 'H2',
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
  }
});
