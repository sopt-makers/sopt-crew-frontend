import { paths } from '@/__generated__/schema2';
import { ampli } from '@/ampli';
import { api } from '@/api';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import { useMeetingQuery } from '@api/meeting/hook';
import { useGetPostListInfiniteQuery, useMutationDeletePost, useMutationUpdateLike } from '@api/post/hooks';
import LikeButton from '@components/@common/button/LikeButton';
import ContentBlocker from '@components/blocker/ContentBlocker';
import FeedActionsContainer from '@components/feed/FeedActionsContainer';
import FeedCreateModal from '@components/feed/Modal/FeedCreateModal';
import { POST_MAX_COUNT, TAKE_COUNT } from '@constants/feed';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useDisplay } from '@hooks/useDisplay';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useScrollRestorationAfterLoading } from '@hooks/useScrollRestoration';
import { useToast } from '@sopt-makers/ui';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView();
  const { open } = useToast();

  const { isMobile, isTablet } = useDisplay();
  const { data: me } = useQueryMyProfile();
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetPostListInfiniteQuery(TAKE_COUNT, Number(meetingId), !!meetingId);
  useScrollRestorationAfterLoading(isLoading);

  const { data: meeting } = useMeetingQuery({ meetingId: Number(meetingId) });
  const { mutate: mutateLike } = useMutationUpdateLike(TAKE_COUNT, Number(meetingId));
  const { mutate: mutateDeletePost } = useMutationDeletePost();

  const handleDeletePost = (postId: number) => {
    mutateDeletePost(postId, {
      onSuccess: () => {
        feedCreateOverlay.close();
        open({
          icon: 'success',
          content: '게시글을 삭제했습니다',
        });
      },
      onError: error => {
        const axiosError = error as AxiosError<{ errorCode: string }>;
        feedCreateOverlay.close();
        open({
          icon: 'error',
          content: axiosError?.response?.data?.errorCode as string,
        });
      },
    });
  };

  const isEmpty = !postsData?.pages[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const postCount = postsData?.total;
  const formattedPostCount = postCount > POST_MAX_COUNT ? `${POST_MAX_COUNT}+` : postCount;

  const handleModalOpen = () => {
    if (me?.orgId) {
      ampli.clickFeedPosting({ user_id: Number(me?.orgId), group_id: Number(meetingId), location: router.pathname });
    }
    feedCreateOverlay.open(({ isOpen, close }) => {
      return <FeedCreateModal meetingId={meetingId} isModalOpened={isOpen} handleModalClose={close} />;
    });
  };

  const handleLikeClick = (postId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutateLike(postId);
    ampli.clickFeedlistLike({ location: router.pathname });
  };

  const { mutateAsync: mutateReportPost } = useMutation({
    mutationFn: (postId: number) =>
      api.post<
        paths['/post/v2/{postId}/report']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >(`/post/v2/${postId}/report`, {}),
  });

  const handleConfirmReportPost =
    ({ postId, callback }: { postId: number; callback: () => void }) =>
    async () => {
      try {
        await mutateReportPost(postId);
        open({
          icon: 'success',
          content: '게시글을 신고했습니다',
        });
        callback();
      } catch (error) {
        const axiosError = error as AxiosError<{ errorCode: string }>;
        open({
          icon: 'error',
          content: axiosError?.response?.data?.errorCode as string,
        });
        callback();
        return;
      }
    };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const renderedPosts = postsData?.pages.map(post => {
    if (!post) return;
    const isMyPost = me?.id === post.user.id;
    return (
      <>
        {post.isBlockedPost ? (
          <ContentBlocker />
        ) : (
          <Link href={`/post?id=${post.id}`} key={post.id}>
            <FeedItem
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              post={post}
              LikeButton={
                <LikeButton isLiked={post.isLiked} likeCount={post.likeCount} onClickLike={handleLikeClick(post.id)} />
              }
              onClick={() =>
                ampli.clickFeedCard({
                  feed_id: post.id,
                  feed_title: post.title,
                  feed_image_total: post.images ? post.images.length : 0,
                  feed_comment_total: post.commentCount,
                  feed_like_total: post.likeCount,
                  group_id: Number(meetingId),
                  crew_status: meeting?.approved,
                  platform_type: isMobile ? 'MO' : 'PC',
                  location: router.pathname,
                })
              }
              Actions={FeedActionsContainer({
                postId: post.id,
                isMine: isMyPost,
                handleDelete: () => handleDeletePost(post.id),
                handleReport: () => handleConfirmReportPost({ postId: post.id, callback: close }),
                overlay: feedCreateOverlay,
              })}
            />
          </Link>
        )}
      </>
    );
  });

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
      {!isFetchingNextPage && hasNextPage ? (
        <div ref={ref} style={{ height: '1px' }} />
      ) : (
        <div style={{ height: '1px' }} />
      )}
      {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
    </>
  );
};

export default FeedPanel;

const SContainer = styled('div', {
  flexType: 'center',
  minHeight: '752px',

  '@media (max-width: 768px)': {
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

    '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
    fontStyle: 'T5',
    ml: '$20',
    padding: '$6 $12',
    borderRadius: '8px',
  },
});
