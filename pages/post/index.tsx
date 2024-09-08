import { paths } from '@/__generated__/schema2';
import { ampli } from '@/ampli';
import { useQueryGetMeeting } from '@api/API_LEGACY/meeting/hooks';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import { apiV2 } from '@api/index';
import { PostCommentWithMentionRequest } from '@api/mention';
import { useMutationPostCommentWithMention } from '@api/mention/hooks';
import { useInfinitePosts, useMutationPostLike, useMutationUpdateLike, useQueryGetPost } from '@api/post/hooks';
import LikeButton from '@components/button/LikeButton';
import FeedActionButton from '@components/feed/FeedActionButton/FeedActionButton';
import FeedCommentContainer from '@components/feed/FeedCommentContainer/FeedCommentContainer';
import FeedCommentInput from '@components/feed/FeedCommentInput/FeedCommentInput';
import FeedCommentLikeSection from '@components/feed/FeedCommentLikeSection/FeedCommentLikeSection';
import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import { MentionContext } from '@components/feed/Mention/MentionContext';
import FeedEditModal from '@components/feed/Modal/FeedEditModal';
import Loader from '@components/loader/Loader';
import ConfirmModal from '@components/modal/ConfirmModal';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import MeetingInfo from '@components/page/meetingDetail/Feed/FeedItem/MeetingInfo';
import { TAKE_COUNT } from '@constants/feed';
import useComment from '@hooks/useComment/useComment';
import useCommentMutation from '@hooks/useComment/useCommentMutation';
import { useDisplay } from '@hooks/useDisplay';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useToast } from '@sopt-makers/ui';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef } from 'react';
import { styled } from 'stitches.config';

export default function PostPage() {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const overlay = useOverlay();
  const { open } = useToast();
  const router = useRouter();
  const { isMobile } = useDisplay();
  const query = router.query;
  const { POST, DELETE } = apiV2.get();

  const { data: me } = useQueryMyProfile();

  const postQuery = useQueryGetPost(query.id as string);

  const commentQuery = useComment();

  const { parentComment } = useContext(MentionContext);

  const { mutateAsync, isLoading: isCreatingComment } = useMutation({
    mutationKey: ['/comment/v1'],
    mutationFn: (comment: string) =>
      POST('/comment/v2', {
        body: {
          postId: post!.id,
          contents: comment,
          isParent: parentComment.parentComment,
          parentCommentId: parentComment.parentComment ? null : parentComment.parentCommentId,
        },
      }),
  });

  const { mutate: mutatePostCommentWithMention } = useMutationPostCommentWithMention({});

  const { mutate: toggleCommentLike } = useCommentMutation();
  const handleClickCommentLike = (commentId: number) => {
    ampli.clickCommentLike({ crew_status: meeting?.approved });
    toggleCommentLike(commentId);
  };

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => isIntersecting,
  });

  // 이해안가는 부분1 : mutateAsync와 mutatePostCommentWithMention 가 나뉜 이유는?
  // 또한, req.content 로 보내던데 FeedCommentInput 에서는 onSubmit으로 content 지정 없이 보내던데?
  const handleCreateComment = async (req: PostCommentWithMentionRequest) => {
    // eslint-disable-next-line prettier/prettier
    ampli.completedCommentPosting({
      crew_status: meeting?.approved,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: Number(me?.orgId),
    });
    await mutateAsync(req.content);
    mutatePostCommentWithMention(req);
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
        open({
          icon: 'error',
          content: error.message,
        });
        callback();
        return;
      }
      open({
        icon: 'success',
        content: '게시글을 신고했습니다',
      });
      callback();
    };

  const post = postQuery.data;
  const { data: meeting } = useQueryGetMeeting({ params: { id: post?.meeting.id ? String(post.meeting.id) : '' } });

  const comments = commentQuery.data?.data?.comments?.filter(
    (
      comment: paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number]
    ): comment is paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number] =>
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
  const { data: posts } = useInfinitePosts(TAKE_COUNT, meetingId as number); // meetingId가 undefined 일 때는 enabled되지 않음
  const postsInMeeting = posts?.pages.filter(_post => _post?.id !== post?.id).slice(0, 3);
  const { mutate: mutateLike } = useMutationUpdateLike(TAKE_COUNT, Number(meetingId));

  const handleClickLike =
    (postId: number) => (mutateCb: (postId: number) => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      ampli.clickFeedlistLike({ crew_status: meeting?.approved, location: router.pathname });
      mutateCb(postId);
    };

  // NOTE: 전체 피드 게시글 조회 & 좋아요의 경우 meetingId가 없고, 캐시 키로 meetingId를 사용하지 않기 때문에 optimistic update가 정상 동작하도록 별도 mutation을 사용한다.
  const { mutate: mutateLikeInAllPost } = useMutationUpdateLike(TAKE_COUNT);
  const { data: allPosts, hasNextPage, fetchNextPage } = useInfinitePosts(TAKE_COUNT);
  const allMeetingPosts = allPosts?.pages.filter(_post => _post?.meeting.id !== meetingId).slice(0, 5); // 현재 조회하는 게시글이 속한 모임의 게시글은 제외한다
  // 현재 모임의 게시글을 제외했는데 모임 게시글이 없다면 다음 페이지를 불러온다.
  useEffect(() => {
    if (!hasNextPage) return;
    // 정책) 전체 모임 게시글 5개 불러올 때 까지 페이지네이션 한다.
    if (allMeetingPosts?.length !== 5) fetchNextPage();
  }, [hasNextPage, allMeetingPosts, fetchNextPage]);

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
                      <ConfirmModal
                        isModalOpened={isOpen}
                        message="게시글을 삭제하시겠습니까?"
                        cancelButton="돌아가기"
                        confirmButton="삭제하기"
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
                      <ConfirmModal
                        isModalOpened={isOpen}
                        message="게시글을 신고하시겠습니까?"
                        cancelButton="돌아가기"
                        confirmButton="신고하기"
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
            commentCount={commentQuery.data?.data?.comments.length || 0}
            likeCount={post.likeCount}
            onClickComment={handleClickComment}
            onClickLike={handleClickPostLike}
          />
        }
        CommentList={
          <>
            {comments?.map(
              (
                comment: paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number]
              ) => (
                <FeedCommentContainer
                  key={comment.id}
                  comment={comment}
                  isMine={comment.user.id === me?.id}
                  postUserId={post.user.id}
                  onClickLike={handleClickCommentLike}
                />
              )
            )}
            <div ref={setTarget} />
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
        {postsInMeeting && postsInMeeting.length > 0 && (
          <FeedListWrapper>
            <FeedListTitle>이 모임의 다른 피드</FeedListTitle>
            <FeedList>
              {postsInMeeting?.map(post => {
                if (!post) return;
                return (
                  <Link key={post.id} href={`/post?id=${post.id}`}>
                    <FeedItem
                      /* TODO: FeedItem 인터페이스 안 맞는거 맞춰주기. 내부에서 query params 의존하는 부분 수정하기. */
                      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                      /* @ts-ignore */
                      post={post}
                      meetingId={meetingId}
                      // eslint-disable-next-line prettier/prettier
                      LikeButton={
                        <LikeButton
                          isLiked={post.isLiked}
                          likeCount={post.likeCount}
                          onClickLike={handleClickLike(post.id)(mutateLike)}
                        />
                      }
                    />
                  </Link>
                );
              })}
            </FeedList>
          </FeedListWrapper>
        )}
        <FeedListWrapper>
          <FeedListTitle>SOPT 모임들의 최신 피드</FeedListTitle>
          <FeedList>
            {allMeetingPosts?.map(post => {
              if (!post) return;
              return (
                <Link key={post.id} href={`/post?id=${post.id}`}>
                  <FeedItem
                    /* TODO: FeedItem 인터페이스 안 맞는거 맞춰주기. 내부에서 query params 의존하는 부분 수정하기. */
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    /* @ts-ignore */
                    post={post}
                    meetingId={meetingId}
                    HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
                    // eslint-disable-next-line prettier/prettier
                    LikeButton={
                      <LikeButton
                        isLiked={post.isLiked}
                        likeCount={post.likeCount}
                        onClickLike={handleClickLike(post.id)(mutateLikeInAllPost)}
                      />
                    }
                  />
                </Link>
              );
            })}
          </FeedList>
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
const FeedListWrapper = styled('div', {
  '&:last-child': {
    marginBottom: '140px',
  },
});
const FeedListTitle = styled('h3', {
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '30px',
  marginBottom: '24px',
  color: '$white',
});
const FeedList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  a: {
    width: '$380',
  },
});
