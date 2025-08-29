import { ampli } from '@/ampli';
import { useGetAdvertisementQuery } from '@api/advertisement/hook';
import { useGetPostListInfiniteQuery } from '@api/post/hooks';
import { useMutationUpdateLike } from '@api/post/mutation';
import { useUserProfileQuery } from '@api/user/hooks';
import AlertIcon from '@assets/svg/alert-triangle.svg';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import TrashIcon from '@assets/svg/trash.svg';
import LikeButton from '@components/@common/button/LikeButton';
import ContentBlocker from '@components/blocker/ContentBlocker';
import FeedActionButton from '@components/feed/FeedActionButton/FeedActionButton';
import FeedEditModal from '@components/feed/Modal/FeedEditModal';
import FeedItem from '@components/page/detail/Feed/FeedItem';
import MeetingInfo from '@components/page/detail/Feed/FeedItem/MeetingInfo';
import { TAKE_COUNT } from '@constants/feed';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useDisplay } from '@hooks/useDisplay';
import { useOverlay } from '@hooks/useOverlay/Index';
import { AdvertisementCategory } from '@type/advertisement';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stitches.config';
import AdCarousel from './AdCarousel';
import PostAlertModal from './PostAlertModal';
import PostDeleteModal from './PostDeleteModal';

const RenderPostsWithAds = () => {
  const { isMobile, isTablet } = useDisplay();

  const { data: postsData } = useGetPostListInfiniteQuery(TAKE_COUNT);

  const { mutate: mutateLikeInAllPost } = useMutationUpdateLike(TAKE_COUNT);

  const router = useRouter();

  const { data: me } = useUserProfileQuery();

  const overlay = useOverlay();

  const handleClickLike =
    (postId: number) => (mutateCb: (postId: number) => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      ampli.clickFeedlistLike({ location: router.pathname });
      mutateCb(postId);
    };

  const { data: postAds } = useGetAdvertisementQuery(AdvertisementCategory.POST);

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
                                    <FeedEditModal isModalOpened={isOpen} postId={post.id} handleModalClose={close} />
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
          {postAds?.advertisements && <AdCarousel slides={postAds?.advertisements} options={OPTIONS} />}
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
                                    <FeedEditModal isModalOpened={isOpen} postId={post.id} handleModalClose={close} />
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
                                    <FeedEditModal isModalOpened={isOpen} postId={post.id} handleModalClose={close} />
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
          {postAds?.advertisements && <AdCarousel slides={postAds?.advertisements} options={OPTIONS} />}
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
                                    <FeedEditModal isModalOpened={isOpen} postId={post.id} handleModalClose={close} />
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
