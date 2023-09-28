import { paths } from '@/__generated__/schema';
import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import Loader from '@components/loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentInput from '@components/feed/FeedCommentInput/FeedCommentInput';
import FeedCommentViewer from '@components/feed/FeedCommentViewer/FeedCommentViewer';
import { useQueryMyProfile } from '@api/user/hooks';
import { useMutationPostLike } from '@api/post/hooks';
import FeedCommentLikeSection from '@components/feed/FeedCommentLikeSection/FeedCommentLikeSection';
import useComment from '@hooks/useComment/useComment';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import useCommentMutation from '@hooks/useComment/useCommentMutation';

export default function PostPage() {
  const { query } = useRouter();
  const { GET, POST } = apiV2.get();

  const { data: me } = useQueryMyProfile();

  const postQuery = useQuery({
    queryKey: ['/post/v1/{postId}', query.id],
    queryFn: () => GET('/post/v1/{postId}', { params: { path: { postId: Number(query.id as string) } } }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    select: res => res.data.data,
    enabled: !!query.id,
    refetchOnWindowFocus: false,
  });

  const commentQuery = useComment();

  const { mutateAsync, isLoading: isCreatingComment } = useMutation({
    mutationKey: ['/comment/v1'],
    mutationFn: (comment: string) => POST('/comment/v1', { body: { postId: post.id, contents: comment } }),
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

  // TODO: 자동으로 타입 추론 되게끔 endpoint 수정 필요
  const post = postQuery.data as paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];

  const comments = commentQuery.data?.pages
    // TODO: 자동으로 타입 추론 되게끔 endpoint 수정 필요
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .flatMap(page => page.data?.data?.comments)
    // NOTE: flatMap시 배열 아이템으로 undefined 타입이 함께 잡혀서 custom type guard 적용해서 필터링해주자
    // eslint-disable-next-line prettier/prettier
    .filter((comment): comment is paths['/comment/v1']['get']['responses']['200']['content']['application/json']['comments'][number] => !!comment);

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
            // TODO: pagination 적용된 걸 토대로 total을 보여줘야 함.
            commentCount={10}
            likeCount={post.likeCount}
            onClickLike={togglePostLike}
          />
        }
        CommentList={
          <>
            {comments?.map(comment => (
              <FeedCommentViewer
                key={comment.id}
                comment={comment}
                Actions={['수정', '삭제']}
                isMine={comment.user.id === me?.id}
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
