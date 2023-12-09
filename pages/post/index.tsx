import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import Loader from '@components/loader/Loader';
import { useRouter } from 'next/router';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentInput from '@components/feed/FeedCommentInput/FeedCommentInput';
import { useQueryMyProfile } from '@api/user/hooks';
import { useInfinitePosts, useMutationPostLike, useQueryGetPost } from '@api/post/hooks';
import FeedCommentLikeSection from '@components/feed/FeedCommentLikeSection/FeedCommentLikeSection';
import useComment from '@hooks/useComment/useComment';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import useCommentMutation from '@hooks/useComment/useCommentMutation';
import FeedCommentContainer from '@components/feed/FeedCommentContainer/FeedCommentContainer';
import { paths } from '@/__generated__/schema';
import FeedActionButton from '@components/feed/FeedActionButton/FeedActionButton';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';
import { styled } from 'stitches.config';
import FeedEditModal from '@components/feed/Modal/FeedEditModal';
import { ampli } from '@/ampli';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import React, { useRef } from 'react';
import { useDisplay } from '@hooks/useDisplay';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import Link from 'next/link';

export default function PostPage() {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const overlay = useOverlay();
  const showToast = useToast();
  const router = useRouter();
  const { isMobile } = useDisplay();
  const query = router.query;
  const { POST, DELETE } = apiV2.get();

  const { data: me } = useQueryMyProfile();

  const postQuery = useQueryGetPost(query.id as string);

  const commentQuery = useComment();

  const { mutateAsync, isLoading: isCreatingComment } = useMutation({
    mutationKey: ['/comment/v1'],
    mutationFn: (comment: string) => POST('/comment/v1', { body: { postId: post!.id, contents: comment } }),
  });

  const { mutate: toggleCommentLike } = useCommentMutation();
  const handleClickCommentLike = (commentId: number) => () => {
    ampli.clickCommentLike({ crew_status: meeting?.approved });
    toggleCommentLike(commentId);
  };

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => isIntersecting && commentQuery.hasNextPage && commentQuery.fetchNextPage(),
  });

  const handleCreateComment = async (comment: string) => {
    // eslint-disable-next-line prettier/prettier
    ampli.completedCommentPosting({ crew_status: meeting?.approved, platform_type: isMobile ? 'MO' : 'PC', user_id: Number(me?.orgId) });
    await mutateAsync(comment);
    commentQuery.refetch();
  };

  const { mutate: togglePostLike } = useMutationPostLike(query.id as string);

  const { mutate: mutateDeletePost } = useMutation({
    mutationFn: () => DELETE('/post/v1/{postId}', { params: { path: { postId: post!.id } } }),
    onSuccess: () => router.replace(`/detail?id=${post?.meeting.id}`),
  });

  const { mutateAsync: mutateReportPost } = useMutation({
    mutationFn: (postId: number) => POST('/post/v1/{postId}/report', { params: { path: { postId } } }),
  });
  const handleConfirmReportPost =
    ({ postId, callback }: { postId: number; callback: () => void }) =>
    async () => {
      const { error } = await mutateReportPost(postId);
      if (error) {
        showToast({ type: 'error', message: error.message });
        callback();
        return;
      }
      showToast({ type: 'info', message: '게시글을 신고했습니다' });
      callback();
    };

  const post = postQuery.data;
  const { data: meeting } = useQueryGetMeeting({ params: { id: post?.meeting.id ? String(post.meeting.id) : '' } });

  const comments = commentQuery.data?.pages
    .flatMap(page => page.data?.data?.comments)
    .filter(
      (
        comment
      ): comment is paths['/comment/v1']['get']['responses']['200']['content']['application/json']['data']['comments'][number] =>
        !!comment
    );

  const handleClickComment = () => {
    const refCurrent = commentRef.current;
    if (refCurrent) {
      refCurrent.focus();
    }
  };

  const handleClickPostLike = () => {
    ampli.clickFeeddetailLike({ crew_status: meeting?.approved });
    togglePostLike();
  };

  const meetingId = meeting?.id;
  const { data: posts } = useInfinitePosts(4, meetingId as number); // meetingId가 undefined 일 때는 enabled되지 않음
  const postsInMeeting = posts?.pages.filter(_post => _post?.id !== post?.id).slice(0, 3);

  // TODO: loading 스켈레톤 UI가 있으면 좋을 듯
  if (!post) return <Loader />;

  const isMine = post.user.id === me?.id;

  return (
    <Container>
      <FeedPostViewer
        post={post}
        // TODO: Actions 합성하는 부분 추상화 한번 더 하자. 너무 verbose 하다.
        Actions={
          isMine
            ? [
                <FeedActionButton
                  onClick={() =>
                    overlay.open(({ isOpen, close }) => (
                      <FeedEditModal isModalOpened={isOpen} postId={String(post.id)} handleModalClose={close} />
                    ))
                  }
                >
                  수정
                </FeedActionButton>,
                <FeedActionButton
                  onClick={() => {
                    overlay.open(({ isOpen, close }) => (
                      // eslint-disable-next-line prettier/prettier
                <ConfirmModal isModalOpened={isOpen} message="게시글을 삭제하시겠습니까?" cancelButton="돌아가기" confirmButton="삭제하기"
                        handleModalClose={close}
                        handleConfirm={mutateDeletePost}
                      />
                    ));
                  }}
                >
                  삭제
                </FeedActionButton>,
              ]
            : [
                <FeedActionButton
                  onClick={() => {
                    overlay.open(({ isOpen, close }) => (
                      // eslint-disable-next-line prettier/prettier
                      <ConfirmModal isModalOpened={isOpen} message="게시글을 신고하시겠습니까?" cancelButton="돌아가기" confirmButton="신고하기"
                        handleModalClose={close}
                        handleConfirm={handleConfirmReportPost({ postId: post.id, callback: close })}
                      />
                    ));
                  }}
                >
                  신고
                </FeedActionButton>,
              ]
        }
        CommentLikeSection={
          <FeedCommentLikeSection
            isLiked={post.isLiked}
            commentCount={commentQuery.data?.pages[0].data?.data?.meta.itemCount || 0}
            likeCount={post.likeCount}
            onClickComment={handleClickComment}
            onClickLike={handleClickPostLike}
          />
        }
        CommentList={
          <>
            {comments?.map(comment => (
              <FeedCommentContainer
                key={comment.id}
                comment={comment}
                isMine={comment.user.id === me?.id}
                isPosterComment={post.user.id === comment.user.id}
                onClickLike={handleClickCommentLike(comment.id)}
              />
            ))}
            {commentQuery.hasNextPage && <div ref={setTarget} />}
          </>
        }
        CommentInput={
          <FeedCommentInput
            ref={commentRef}
            writerName={post.user.name}
            onSubmit={handleCreateComment}
            disabled={isCreatingComment}
          />
        }
        onClickImage={() => {
          ampli.clickFeeddetailLike({ crew_status: meeting?.approved });
        }}
        // NOTE: link 클릭하면 이동해버리기 때문에 이벤트 로깅이 잘 되지 않는다. 이를 방지하기 위해 로깅 이후에 이동하도록 하자.
        onClickAuthor={async (e: React.MouseEvent<HTMLAnchorElement>) => {
          const href = e.currentTarget.href;
          e.preventDefault();
          await ampli.clickFeeddetatilProfile({ crew_status: meeting?.approved }).promise;
          window.location.assign(href);
        }}
      />
      <FeedListContainer>
        <FeedListWrapper>
          <FeedListTitle>이 모임의 다른 피드</FeedListTitle>
          <FeedList>
            {postsInMeeting?.map(post => (
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              <Link key={post!.id} href={`/post?id=${post!.id}`}>
                <a>
                  {/* TODO: FeedItem 인터페이스 안 맞는거 맞춰주기. 내부에서 query params 의존하는 부분 수정하기. */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <FeedItem post={post} meetingId={meetingId} />
                </a>
              </Link>
            ))}
          </FeedList>
        </FeedListWrapper>
        <FeedListWrapper>
          <FeedListTitle>SOPT 모임들의 최신 피드</FeedListTitle>
          <FeedList>{/* TODO: 전체 모임 피드 */}</FeedList>
        </FeedListWrapper>
      </FeedListContainer>
    </Container>
  );
}

const Container = styled('div', {
  flexType: 'horizontalCenter',
  gap: '40px',
  '@laptop': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
  },
});
const FeedListContainer = styled('div', {
  width: '380px',
  display: 'flex',
  flexDirection: 'column',
  gap: '80px',
  '@laptop': {
    width: '800px',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px',
  },
  '@tablet': {
    display: 'none',
  },
});
const FeedListWrapper = styled('div', {});
const FeedListTitle = styled('h3', {
  marginBottom: '24px',
  color: '$white',
  fontStyle: 'T4',
});
const FeedList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
