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

export default function PostPage() {
  const overlay = useOverlay();
  const router = useRouter();
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
      />
    </Container>
  );
}

const Container = styled('div', {
  flexType: 'horizontalCenter',
});
