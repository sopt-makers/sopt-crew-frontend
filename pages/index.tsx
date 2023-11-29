import { ampli } from '@/ampli';
import { useInfinitePosts } from '@api/post/hooks';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import MobileFeedListSkeleton from '@components/page/meetingDetail/Feed/Skeleton/MobileFeedListSkeleton';
import { TabList } from '@components/tabList/TabList';
import { Flex } from '@components/util/layout/Flex';
import { TAKE_COUNT } from '@constants/feed';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useDisplay } from '@hooks/useDisplay';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import type { NextPage } from 'next';
import Link from 'next/link';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const { isTablet } = useDisplay();
  const { data: postsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts(TAKE_COUNT, 89);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const renderedPosts = postsData?.pages.map(post => (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    <Link href={`/post?id=${post!.id}`} key={post!.id}>
      <a>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FeedItem {...post!} />
      </a>
    </Link>
  ));

  return (
    <>
      <div>
        <Flex align="start" justify="between">
          <TabList text="feedAll" size="big">
            <Link href="/" passHref>
              <a
                onClick={() => {
                  ampli.clickNavbarGroup({ menu: '모임 피드' });
                }}
              >
                <TabList.Item text="feedAll">모임 피드</TabList.Item>
              </a>
            </Link>
            <Link href="/list" passHref>
              <a
                onClick={() => {
                  ampli.clickNavbarGroup({ menu: '전체 모임' });
                }}
              >
                <TabList.Item text="groupAll">전체 모임</TabList.Item>
              </a>
            </Link>
            <Link href="/mine" passHref>
              <a
                onClick={() => {
                  ampli.clickNavbarGroup({ menu: '내 모임' });
                }}
              >
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
        <div ref={setTarget} />

        {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
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
