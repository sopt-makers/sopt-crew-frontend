import AvatarGroup from '@components/avatar/AvatarGroup';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
// import MoreIcon from '@assets/svg/more.svg';
import LikeDefaultIcon from '@assets/svg/like_default.svg';
import LikeActiveIcon from '@assets/svg/like_active.svg';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import Avatar from '@components/avatar/Avatar';
import truncateText from '@utils/truncateText';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import {
  AVATAR_MAX_LENGTH,
  CARD_CONTENT_MAX_LENGTH,
  CARD_TITLE_MAX_LENGTH,
  LIKE_MAX_COUNT,
  TAKE_COUNT,
} from '@constants/feed';
import { UserResponse } from '@api/user';
import { fromNow } from '@utils/dayjs';
import { useMutationUpdateLike } from '@api/post/hooks';
import { useRouter } from 'next/router';

interface FeedItemProps {
  id: number;
  user: UserResponse;
  title: string;
  contents: string;
  images?: string[];
  updatedDate: string;
  commenterThumbnails?: string[];
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
}

const FeedItem = (post: FeedItemProps) => {
  const { id, user, title, contents, images, updatedDate, commenterThumbnails, commentCount, likeCount, isLiked } =
    post;
  const formattedLikeCount = likeCount > LIKE_MAX_COUNT ? `${LIKE_MAX_COUNT}+` : likeCount;
  const router = useRouter();
  const meetingId = router.query.id as string;
  const { mutate } = useMutationUpdateLike(TAKE_COUNT, Number(meetingId), id);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <SFeedItem>
      <STop>
        <Flex align="center">
          <SProfileImageWrapper>
            {user.profileImage ? <SProfileImage src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
          </SProfileImageWrapper>
          <SName>{user.name}</SName>
          <STime>{fromNow(updatedDate)}</STime>
        </Flex>
        {/* <MoreIcon /> */}
      </STop>

      <STitle>{truncateText(title, CARD_TITLE_MAX_LENGTH)}</STitle>
      <SContent>{truncateText(contents, CARD_CONTENT_MAX_LENGTH)}</SContent>
      {images && images[THUMBNAIL_IMAGE_INDEX] && (
        <SThumbnailWrapper>
          <SThumbnail src={images[THUMBNAIL_IMAGE_INDEX]} alt="" />
          {images.length > 1 && <SThumbnailCount>+{images.length - 1}</SThumbnailCount>}
        </SThumbnailWrapper>
      )}

      <SBottom>
        <Flex align="center">
          {commenterThumbnails && (
            <AvatarGroup>
              {[...commenterThumbnails]
                ?.sort()
                .slice(0, AVATAR_MAX_LENGTH)
                .map((thumbnail, index) => (
                  <Avatar
                    key={`${thumbnail}-${index}`}
                    src={thumbnail}
                    alt=""
                    Overlay={
                      commenterThumbnails.length > AVATAR_MAX_LENGTH &&
                      index === AVATAR_MAX_LENGTH - 1 && <SOverlay>+</SOverlay>
                    }
                  />
                ))}
            </AvatarGroup>
          )}
          <SCommentWrapper hasComment={commentCount > 0}>
            <SComment>댓글</SComment>
            <SCommentCount>{commentCount}</SCommentCount>
          </SCommentWrapper>
        </Flex>

        <SLikeButton like={isLiked} onClick={handleLikeClick}>
          {isLiked ? <LikeActiveIcon /> : <LikeDefaultIcon />}
          {formattedLikeCount}
        </SLikeButton>
      </SBottom>
    </SFeedItem>
  );
};

export default FeedItem;

const SFeedItem = styled(Box, {
  padding: '$24 $20 $28 $20',
  background: '#171818',
  borderRadius: '12px',
  color: '$white100',
  width: '100%',
  '@tablet': {
    padding: '$24 0 $28 0',
    background: 'transparent',
    borderRadius: 0,
    margin: '0 auto',
  },
});

const STop = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$12',
});

const SProfileImageWrapper = styled('div', {
  width: '$32',
  height: '$32',
  objectFit: 'cover',
  borderRadius: '$round',
  background: '$black60',
  overflow: 'hidden',
});

const SProfileImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SName = styled('span', {
  ml: '$8',
  fontStyle: 'T5',
});

const STime = styled('span', {
  ml: '$8',
  fontStyle: 'T6',
  color: '$gray100',
});

const STitle = styled(Box, {
  mb: '$8',
  fontStyle: 'H3',

  '@tablet': {
    fontStyle: 'H4',
  },
});

const SContent = styled(Box, {
  mb: '$20',
  color: '$gray40',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  '@tablet': {
    fontStyle: 'B3',
  },
});

const SThumbnailWrapper = styled(Box, {
  position: 'relative',
});

const SThumbnail = styled('img', {
  display: 'block',
  mb: '$20',
  borderRadius: '8px',
  background: '$black60',
  width: '100%',
  maxWidth: '$340',
  height: 'fit-content',
  aspectRatio: '4 / 3',
  objectFit: 'cover',

  '@tablet': {
    maxWidth: '100%',
  },
});

const SThumbnailCount = styled(Box, {
  position: 'absolute',
  top: '12px',
  right: '12px',
  zIndex: 1,
  backgroundColor: '$black100',
  opacity: 0.6,
  color: '$gray30',
  borderRadius: '50%',
  fontStyle: 'T5',
  width: '40px',
  height: '40px',
  flexType: 'center',

  '@tablet': {
    width: '36px',
    height: '36px',
  },
});

const SBottom = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
});

const SCommentWrapper = styled('div', {
  variants: {
    hasComment: {
      true: {
        ml: '$8',
      },
    },
  },
});

const SComment = styled('span', {
  fontStyle: 'T5',
  color: '$gray40',
});

const SCommentCount = styled('span', {
  ml: '$4',
  fontStyle: 'H5',
});

const SLikeButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'H5',

  variants: {
    like: {
      true: {
        color: '$red',
      },
      false: {
        color: '$white100',
      },
    },
  },

  '& > svg': {
    mr: '$6',
  },
});

const SOverlay = styled(Box, {
  position: 'absolute',
  background: '$black100',
  opacity: 0.7,
  width: '100%',
  height: '100%',
  flexType: 'center',
  color: '$white100',
});
