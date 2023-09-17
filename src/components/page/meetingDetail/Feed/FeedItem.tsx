import AvatarGroup from '@components/avatar/AvatarGroup';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import MoreIcon from '@assets/svg/more.svg';
import LikeDefaultIcon from '@assets/svg/like_default.svg';
import LikeActiveIcon from '@assets/svg/like_active.svg';
import Avatar from '@components/avatar/Avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useState } from 'react';
import { colors } from '@sopt-makers/colors';

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

const FeedItem = ({
  profileImage,
  name,
  title,
  contents,
  images,
  updatedDate,
  commenterThumbnails,
  commentCount,
  likeCount,
}: FeedItemProps) => {
  const formattedLikeCount = likeCount > 999 ? '999+' : likeCount;
  const [like, setLike] = useState(false);

  return (
    <SFeedItem>
      <STop>
        <Flex align="center">
          <SProfileImage src={profileImage} alt="" />
          <SName>{name}</SName>
          <STime>{dayjs(updatedDate).fromNow()}</STime>
        </Flex>
        <MoreIcon />
      </STop>

      <STitle>{title}</STitle>
      <SContent>{contents}</SContent>
      {images && <SThumbnail src={images[0]} alt="" />}

      <SBottom>
        <Flex align="center">
          {commenterThumbnails && (
            <AvatarGroup>
              {commenterThumbnails.slice(0, 3).map((thumbnail, index) => (
                <Avatar
                  key={`${thumbnail}-${index}`}
                  src={thumbnail}
                  alt=""
                  Overlay={commenterThumbnails.length > 3 && index === 2 && <SOverlay>+</SOverlay>}
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
  maxWidth: '$380',

  '@tablet': {
    padding: '$24 0 $28 0',
    margin: '0 auto',
    maxWidth: '100%',
    minWidth: '100%',
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
  background: colors.black100,
  opacity: 0.7,
  width: '100%',
  height: '100%',
  flexType: 'center',
});
