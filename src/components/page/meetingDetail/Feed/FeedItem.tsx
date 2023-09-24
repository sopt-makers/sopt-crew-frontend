import AvatarGroup from '@components/avatar/AvatarGroup';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
// import MoreIcon from '@assets/svg/more.svg';
import LikeDefaultIcon from '@assets/svg/like_default.svg';
import LikeActiveIcon from '@assets/svg/like_active.svg';
import Avatar from '@components/avatar/Avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useState } from 'react';
import truncateText from '@utils/truncateText';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import { AVATAR_MAX_LENGTH, CARD_CONTENT_MAX_LENGTH, CARD_TITLE_MAX_LENGTH, LIKE_MAX_COUNT } from '@constants/feed';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface FeedItemProps {
  profileImage: string;
  name: string;
  title: string;
  contents: string;
  images?: string[];
  updatedDate: string;
  commenterThumbnails?: string[];
  commentCount: number;
  likeCount: number;
}

const FeedItem = (post: FeedItemProps) => {
  const { profileImage, name, title, contents, images, updatedDate, commenterThumbnails, commentCount, likeCount } =
    post;
  const formattedLikeCount = likeCount > LIKE_MAX_COUNT ? `${LIKE_MAX_COUNT}+` : likeCount;
  const [like, setLike] = useState(false);

  return (
    <SFeedItem>
      <STop>
        <Flex align="center">
          <SProfileImage src={profileImage} alt="" />
          <SName>{name}</SName>
          <STime>{dayjs(updatedDate).fromNow()}</STime>
        </Flex>
        {/* <MoreIcon /> */}
      </STop>

      <STitle>{truncateText(title, CARD_TITLE_MAX_LENGTH)}</STitle>
      <SContent>{truncateText(contents, CARD_CONTENT_MAX_LENGTH)}</SContent>
      {images && (
        <SThumbnailWrapper>
          <SThumbnail src={images[THUMBNAIL_IMAGE_INDEX]} alt="" />
          {images.length > 1 && <SThumbnailCount>+{images.length - 1}</SThumbnailCount>}
        </SThumbnailWrapper>
      )}

      <SBottom>
        <Flex align="center">
          {commenterThumbnails && (
            <AvatarGroup>
              {commenterThumbnails.slice(0, AVATAR_MAX_LENGTH).map((thumbnail, index) => (
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

        <SLikeButton like={like} onClick={() => setLike(prev => !prev)}>
          {like ? <LikeActiveIcon /> : <LikeDefaultIcon />}
          {formattedLikeCount}
        </SLikeButton>
      </SBottom>
    </SFeedItem>
  );
};

export default FeedItem;

const SFeedItem = styled(Box, {
  padding: '$24 $20 $28 $20',
  color: '$white100',
  width: '$380',

  '@tablet': {
    padding: '$24 0 $28 0',
    margin: '0 auto',
    width: '100%',
  },
});

const STop = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$12',
});

const SProfileImage = styled('img', {
  width: '$32',
  height: '$32',
  objectFit: 'cover',
  borderRadius: '$round',
  background: '$black60',
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
        transform: 'translateX(-66%)',
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
});
