import { ampli } from '@/ampli';
import { useInfinitePosts, useMutationUpdateLike } from '@api/post/hooks';
import { TAKE_COUNT } from '@constants/feed';
import React from 'react';
import Link from 'next/link';
import FeedItem from '@components/page/meetingDetail/Feed/FeedItem';
import LikeButton from '@components/button/LikeButton';
import { useRouter } from 'next/router';
import MeetingInfo from '@components/page/meetingDetail/Feed/FeedItem/MeetingInfo';
import { useDisplay } from '@hooks/useDisplay';
import { styled } from 'stitches.config';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useGetPostAds } from '@api/advertisement/hook';
import AdCarousel from './AdCarousel';
import FeedActionButton from '@components/feed/FeedActionButton/FeedActionButton';
import { useOverlay } from '@hooks/useOverlay/Index';
import FeedEditModal from '@components/feed/Modal/FeedEditModal';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import TrashIcon from '@assets/svg/trash.svg';
import AlertIcon from '@assets/svg/alert-triangle.svg';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import PostDeleteModal from './PostDeleteModal';
import PostAlertModal from './PostAlertModal';
import ContentBlocker from '@components/blocker/ContentBlocker';

const RenderPostsWithAds = () => {
  const { isMobile, isTablet } = useDisplay();

  const { data: postsData } = useInfinitePosts(TAKE_COUNT);

  const { mutate: mutateLikeInAllPost } = useMutationUpdateLike(TAKE_COUNT);

  const router = useRouter();

  const { data: me } = useQueryMyProfile();

  const overlay = useOverlay();

  const handleClickLike =
    (postId: number) => (mutateCb: (postId: number) => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      ampli.clickFeedlistLike({ location: router.pathname });
      mutateCb(postId);
    };

  const { data: postAds } = useGetPostAds();

  const OPTIONS = { loop: true };

  return (
    <>
      {isTablet ? (
        <SMobileContainer>
          {postsData?.pages.slice(0, 2).map(post => {
            if (!post) return;
            const isMine = post.user.id === me?.id;

            return (
              <>
                {post.isBlockedPost ? (
                  <ContentBlocker />
                ) : (
                  <Link href={`/post?id=${post?.id}`} key={post?.id}>
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
                      onClick={() =>
                        ampli.clickFeedCard({
                          feed_id: post.id,
                          feed_upload: post.updatedDate,
                          feed_title: post.title,
                          feed_image_total: post.images ? post.images.length : 0,
                          feed_comment_total: post.commentCount,
                          feed_like_total: post.likeCount,
                          group_id: post.meeting.id,
                          platform_type: isMobile ? 'MO' : 'PC',
                          location: router.pathname,
                        })
                      }
                      HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
                      Actions={
                        isMine
                          ? [
                              <FeedActionButton
                                onClick={() =>
                                  overlay.open(({ isOpen, close }) => (
                                    <FeedEditModal
                                      isModalOpened={isOpen}
                                      postId={String(post.id)}
                                      handleModalClose={close}
                                    />
                                  ))
                                }
                              >
                                <ReWriteIcon />
                                수정
                              </FeedActionButton>,
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    <PostDeleteModal
                                      isOpen={isOpen}
                                      close={close}
                                      postId={post.id}
                                      meetingId={post.meeting.id}
                                    />
                                  ));
                                }}
                              >
                                <TrashIcon />
                                삭제
                              </FeedActionButton>,
                            ]
                          : [
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    // eslint-disable-next-line prettier/prettier
                                    <PostAlertModal isOpen={isOpen} close={close} postId={post.id} />
                                  ));
                                }}
                              >
                                <AlertIcon />
                                신고
                              </FeedActionButton>,
                            ]
                      }
                    />
                  </Link>
                )}
              </>
            );
          })}
          {postAds && <AdCarousel slides={postAds.advertisements} options={OPTIONS} />}
          {postsData?.pages.slice(2).map(post => {
            if (!post) return;
            const isMine = post.user.id === me?.id;

            return (
              <>
                {post.isBlockedPost ? (
                  <ContentBlocker />
                ) : (
                  <Link href={`/post?id=${post?.id}`} key={post?.id}>
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
                      onClick={() =>
                        ampli.clickFeedCard({
                          feed_id: post.id,
                          feed_upload: post.updatedDate,
                          feed_title: post.title,
                          feed_image_total: post.images ? post.images.length : 0,
                          feed_comment_total: post.commentCount,
                          feed_like_total: post.likeCount,
                          group_id: post.meeting.id,
                          platform_type: isMobile ? 'MO' : 'PC',
                          location: router.pathname,
                        })
                      }
                      HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
                      Actions={
                        isMine
                          ? [
                              <FeedActionButton
                                onClick={() =>
                                  overlay.open(({ isOpen, close }) => (
                                    <FeedEditModal
                                      isModalOpened={isOpen}
                                      postId={String(post.id)}
                                      handleModalClose={close}
                                    />
                                  ))
                                }
                              >
                                <ReWriteIcon />
                                수정
                              </FeedActionButton>,
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    <PostDeleteModal
                                      isOpen={isOpen}
                                      close={close}
                                      postId={post.id}
                                      meetingId={post.meeting.id}
                                    />
                                  ));
                                }}
                              >
                                <TrashIcon />
                                삭제
                              </FeedActionButton>,
                            ]
                          : [
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    // eslint-disable-next-line prettier/prettier
                                    <PostAlertModal isOpen={isOpen} close={close} postId={post.id} />
                                  ));
                                }}
                              >
                                <AlertIcon />
                                신고
                              </FeedActionButton>,
                            ]
                      }
                    />
                  </Link>
                )}
              </>
            );
          })}
        </SMobileContainer>
      ) : (
        <SDesktopContainer align="center" gap={30}>
          {postsData?.pages.slice(0, 2).map(post => {
            const isMine = post.user.id === me?.id;

            if (!post) return;

            return (
              <>
                {post.isBlockedPost ? (
                  <ContentBlocker />
                ) : (
                  <Link href={`/post?id=${post?.id}`} key={post?.id}>
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
                      onClick={() =>
                        ampli.clickFeedCard({
                          feed_id: post.id,
                          feed_upload: post.updatedDate,
                          feed_title: post.title,
                          feed_image_total: post.images ? post.images.length : 0,
                          feed_comment_total: post.commentCount,
                          feed_like_total: post.likeCount,
                          group_id: post.meeting.id,
                          platform_type: isMobile ? 'MO' : 'PC',
                          location: router.pathname,
                        })
                      }
                      HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
                      Actions={
                        isMine
                          ? [
                              <FeedActionButton
                                onClick={() =>
                                  overlay.open(({ isOpen, close }) => (
                                    <FeedEditModal
                                      isModalOpened={isOpen}
                                      postId={String(post.id)}
                                      handleModalClose={close}
                                    />
                                  ))
                                }
                              >
                                <ReWriteIcon />
                                수정
                              </FeedActionButton>,
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    <PostDeleteModal
                                      isOpen={isOpen}
                                      close={close}
                                      postId={post.id}
                                      meetingId={post.meeting.id}
                                    />
                                  ));
                                }}
                              >
                                <TrashIcon />
                                삭제
                              </FeedActionButton>,
                            ]
                          : [
                              <FeedActionButton
                                onClick={() => {
                                  overlay.open(({ isOpen, close }) => (
                                    // eslint-disable-next-line prettier/prettier
                                    <PostAlertModal isOpen={isOpen} close={close} postId={post.id} />
                                  ));
                                }}
                              >
                                <AlertIcon />
                                신고
                              </FeedActionButton>,
                            ]
                      }
                    />
                  </Link>
                )}
              </>
            );
          })}
          {postAds && <AdCarousel slides={postAds.advertisements} options={OPTIONS} />}

          {postsData?.pages.slice(2).map(post => {
            if (!post) return;
            const isMine = post.user.id === me?.id;

            return (
              <>
                {post.isBlockedPost ? (
                  <ContentBlocker />
                ) : (
                  <Link href={`/post?id=${post?.id}`} key={post?.id}>
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
                      onClick={() =>
                        ampli.clickFeedCard({
                          feed_id: post.id,
                          feed_upload: post.updatedDate,
                          feed_title: post.title,
                          feed_image_total: post.images ? post.images.length : 0,
                          feed_comment_total: post.commentCount,
                          feed_like_total: post.likeCount,
                          group_id: post.meeting.id,
                          platform_type: isMobile ? 'MO' : 'PC',
                          location: router.pathname,
                        })
                      }
                      HeaderSection={<MeetingInfo meetingInfo={post.meeting} />}
                      Actions={
                        isMine
                          ? [
                              <FeedActionButton
                                onClick={e => {
                                  overlay.open(({ isOpen, close }) => (
                                    <FeedEditModal
                                      isModalOpened={isOpen}
                                      postId={String(post.id)}
                                      handleModalClose={close}
                                    />
                                  ));
                                }}
                              >
                                <ReWriteIcon />
                                수정
                              </FeedActionButton>,
                              <FeedActionButton
                                onClick={e => {
                                  {
                                    overlay.open(({ isOpen, close }) => (
                                      // eslint-disable-next-line prettier/prettier
                                      <PostDeleteModal
                                        isOpen={isOpen}
                                        close={close}
                                        postId={post.id}
                                        meetingId={post.meeting.id}
                                      />
                                    ));
                                  }
                                }}
                              >
                                <TrashIcon />
                                삭제
                              </FeedActionButton>,
                            ]
                          : [
                              <FeedActionButton
                                onClick={e => {
                                  {
                                    overlay.open(({ isOpen, close }) => (
                                      // eslint-disable-next-line prettier/prettier
                                      <PostAlertModal isOpen={isOpen} close={close} postId={post.id} />
                                    ));
                                  }
                                }}
                              >
                                <AlertIcon />
                                신고
                              </FeedActionButton>,
                            ]
                      }
                    />
                  </Link>
                )}
              </>
            );
          })}
        </SDesktopContainer>
      )}
    </>
  );
};

export default RenderPostsWithAds;

const SDesktopContainer = styled(MasonryInfiniteGrid, {
  margin: '$20 0',
  a: {
    width: '380px',
  },
});

const SMobileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
});
