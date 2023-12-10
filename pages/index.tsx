import { ampli } from '@/ampli';
import { useInfinitePosts, useMutationUpdateLike } from '@api/post/hooks';
import LikeButton from '@components/button/LikeButton';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import MeetingInfo from '@components/page/meetingDetail/Feed/FeedItem/MeetingInfo';
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
  const { isTablet } = useDisplay();
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data: postsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts(TAKE_COUNT);

  const { mutate: mutateLikeInAllPost } = useMutationUpdateLike(TAKE_COUNT);

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
                <TabList.Item text="feedAll">모임 피드</TabList.Item>
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

        {isTablet ? (
          <SMobileContainer>{renderedPosts}</SMobileContainer>
        ) : (
          <SDesktopContainer align="left" gap={30}>
            {renderedPosts}
          </SDesktopContainer>
        )}

        {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
        {!isFetchingNextPage && hasNextPage && <div ref={ref} />}

        <FloatingButton />
      </div>
    </>
  );
};

export default Home;

const SDesktopContainer = styled(MasonryInfiniteGrid, {
  marginTop: '$40',
  a: {
    width: 'calc(calc(100% - 60px) / 3)',
  },
});

const SMobileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 0,
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
