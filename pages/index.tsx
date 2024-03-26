import { ampli } from '@/ampli';
import { useQueryGetGroupBrowsingCard } from '@api/meeting/hooks';
import { useInfinitePosts, useMutationUpdateLike } from '@api/post/hooks';
import LikeButton from '@components/button/LikeButton';
import Carousel from '@components/groupBrowsing/Carousel/Carousel';
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
        <a>
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
        </a>
      </Link>
    );
  });

  return (
    <>
      <div>
        <Flex align="start" justify="between">
          <TabList text="feedAll" size="big">
            <Link href="/" passHref>
              <a onClick={() => ampli.clickNavbarGroup({ menu: '피드' })}>
                <TabList.Item text="feedAll">홈</TabList.Item>
              </a>
            </Link>
            <Link href="/list" passHref>
              <a onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
                <TabList.Item text="groupAll">전체 모임</TabList.Item>
              </a>
            </Link>
            <Link href="/mine" passHref>
              <a onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
                <TabList.Item text="mine">내 모임</TabList.Item>
              </a>
            </Link>
          </TabList>
        </Flex>

        {isLoading &&
          (isTablet ? <MobileFeedListSkeleton count={3} /> : <DesktopFeedListSkeleton row={3} column={3} />)}

        {isTablet ? (
          <SMobileContainer>{renderedPosts}</SMobileContainer>
        ) : (
          <>
            <SContentTitle style={{ marginTop: '54px' }}>
              모임 둘러보기
              <Link href="/list" passHref>
                <a>
                  <SMoreButton>더보기 {'>'}</SMoreButton>
                </a>
              </Link>
            </SContentTitle>
            <div style={{ width: '100vw', position: 'absolute', left: '0', display: 'flex', justifyContent: 'center' }}>
              {groupBrowsingCardData && <Carousel cardList={groupBrowsingCardData} />}
            </div>
            <div style={{ paddingBottom: '230px' }}></div>
            <SContentTitle>최신 피드</SContentTitle>
            <SDesktopContainer align="left" gap={30}>
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
    width: 'calc(calc(100% - 60px) / 3)',
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
  '@media (max-width: 1259px)': {
    width: '790px',
  },
});

const SMoreButton = styled('button', {
  color: '$gray200',
  /* TODO: mds font 로 변환 */
  fontSize: '$14',
  fontWeight: '600',
  lineHeight: '$18',
});
