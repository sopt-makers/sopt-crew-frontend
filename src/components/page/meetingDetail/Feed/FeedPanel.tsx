import { ampli } from '@/ampli';
import { useInfinitePosts } from '@api/post/hooks';
import { useQueryMyProfile } from '@api/user/hooks';
import FeedCreateModal from '@components/feed/Modal/FeedCreateModal';
import { POST_MAX_COUNT, TAKE_COUNT } from '@constants/feed';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useDisplay } from '@hooks/useDisplay';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useScrollRestorationAfterLoading } from '@hooks/useScrollRestoration';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';
import FeedItem from './FeedItem';
import MobileFeedListSkeleton from './Skeleton/MobileFeedListSkeleton';

interface FeedPanelProps {
  isMember: boolean;
}

const FeedPanel = ({ isMember }: FeedPanelProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const feedCreateOverlay = useOverlay();

  const { isTablet } = useDisplay();
  const { data: me } = useQueryMyProfile();
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfinitePosts(TAKE_COUNT, Number(meetingId));
  useScrollRestorationAfterLoading(isLoading);

  const isEmpty = !postsData?.pages[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const postCount = postsData?.total;
  const formattedPostCount = postCount > POST_MAX_COUNT ? `${POST_MAX_COUNT}+` : postCount;
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const handleModalOpen = () => {
    if (me?.orgId) {
      ampli.clickFeedPosting({ user_id: Number(me?.orgId), group_id: Number(meetingId) });
    }
    feedCreateOverlay.open(({ isOpen, close }) => {
      return <FeedCreateModal meetingId={meetingId} isModalOpened={isOpen} handleModalClose={close} />;
    });
  };

  const renderedPosts = postsData?.pages.map(post => (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    <Link href={`/post?id=${post!.id}`} key={post!.id}>
      <a>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FeedItem post={post} />
      </a>
    </Link>
  ));

  return (
    <>
      {isEmpty && (
        <SContainer>
          <EmptyView isMember={isMember} />
        </SContainer>
      )}

      {postCount > 0 && (
        <SHeader>
          <p>
            🔥 지금까지 쌓인 피드 <SCount>{formattedPostCount}</SCount>개
          </p>
          {isMember && <SButton onClick={handleModalOpen}>{isTablet ? '+ 작성' : '나도 작성하기'}</SButton>}
        </SHeader>
      )}

      {isTablet ? (
        <SMobileContainer>{renderedPosts}</SMobileContainer>
      ) : (
        <SDesktopContainer align="left" gap={30}>
          {renderedPosts}
        </SDesktopContainer>
      )}
      <div ref={setTarget} />

      {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
    </>
  );
};

export default FeedPanel;

const SContainer = styled('div', {
  flexType: 'center',
  minHeight: '752px',

  '@tablet': {
    minHeight: '376px',
    height: '100%',
  },
});

const SDesktopContainer = styled(MasonryInfiniteGrid, {
  marginTop: '$32',
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

const SHeader = styled('div', {
  flexType: 'center',
  padding: '$31 0',
  fontStyle: 'H1',
  color: '$gray200',

  '@tablet': {
    padding: '$16 $20',
    fontStyle: 'H5',
    backgroundColor: '$gray800',
    mt: '$28',
    borderRadius: '12px',
    flexType: 'verticalCenter',
    justifyContent: 'space-between',
  },
});

const SCount = styled('span', {
  color: '$gray10',
});

const SButton = styled('button', {
  backgroundColor: '$secondary',
  fontStyle: 'H2',
  ml: '$48',
  color: '$white',
  padding: '$16 $36',
  borderRadius: '14px',

  '@tablet': {
    fontStyle: 'T5',
    ml: '$20',
    padding: '$6 $12',
    borderRadius: '8px',
  },
});
