import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import Loader from '@components/loader/Loader';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentInput from '@components/feed/FeedCommentInput/FeedCommentInput';
import { useQueryMyProfile } from '@api/user/hooks';
import { useMutationPostLike, useQueryGetPost } from '@api/post/hooks';
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
import React from 'react';
import { useDisplay } from '@hooks/useDisplay';

export default function PostPage() {
  const overlay = useOverlay();
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
  const handleClickCommentLike = (commentId: number) => () => toggleCommentLike(commentId);

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

  const post = postQuery.data;
  const { data: meeting } = useQueryGetMeeting({ params: { id: String(post?.meeting.id) } });

  const comments = commentQuery.data?.pages
    .flatMap(page => page.data?.data?.comments)
    .filter(
      (
        comment
      ): comment is paths['/comment/v1']['get']['responses']['200']['content']['application/json']['data']['comments'][number] =>
        !!comment
    );

  const handleClickPostLike = () => {
    ampli.clickFeeddetailLike({ crew_status: meeting?.approved });
    togglePostLike();
  };

  // TODO: loading 스켈레톤 UI가 있으면 좋을 듯
  if (!post) return <Loader />;

  return (
    <Container>
      <FeedPostViewer
        post={post}
        isMine={post.user.id === me?.id}
        Actions={[
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
        ]}
        CommentLikeSection={
          <FeedCommentLikeSection
            isLiked={post.isLiked}
            commentCount={commentQuery.data?.pages[0].data?.data?.meta.itemCount || 0}
            likeCount={post.likeCount}
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
        CommentInput={<FeedCommentInput onSubmit={handleCreateComment} disabled={isCreatingComment} />}
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
    </Container>
  );
}

const Container = styled('div', {
  flexType: 'horizontalCenter',
});
