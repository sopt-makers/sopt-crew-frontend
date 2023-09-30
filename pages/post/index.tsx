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

export default function PostPage() {
  const { query } = useRouter();
  const { POST } = apiV2.get();

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

  const post = postQuery.data;

  const comments = commentQuery.data?.pages
    .flatMap(page => page.data?.data?.comments)
    .filter(
      (
        comment
      ): comment is paths['/comment/v1']['get']['responses']['200']['content']['application/json']['data']['comments'][number] =>
        !!comment
    );

  // TODO: loading 스켈레톤 UI가 있으면 좋을 듯
  if (!post) return <Loader />;

  return (
    <div>
      <FeedPostViewer
        post={post}
        Actions={['수정', '삭제']}
        CommentLikeSection={
          <FeedCommentLikeSection
            isLiked={post.isLiked}
            commentCount={commentQuery.data?.pages[0].data?.data?.meta.itemCount || 0}
            likeCount={post.likeCount}
            onClickLike={togglePostLike}
          />
        }
        CommentList={
          <>
            {comments?.map(comment => (
              <FeedCommentContainer
                key={comment.id}
                comment={comment}
                isMine={comment.user.id === post.user.id}
                onClickLike={handleClickCommentLike(comment.id)}
              />
            ))}
            {commentQuery.hasNextPage && <div ref={setTarget} />}
          </>
        }
        CommentInput={<FeedCommentInput onSubmit={handleCreateComment} disabled={isCreatingComment} />}
      />
    </div>
  );
}
