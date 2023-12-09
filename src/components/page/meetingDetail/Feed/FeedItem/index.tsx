import AvatarGroup from '@components/avatar/AvatarGroup';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
// import MoreIcon from '@assets/svg/more.svg';
import { ampli } from '@/ampli';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import { UserResponse } from '@api/user';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import Avatar from '@components/avatar/Avatar';
import { AVATAR_MAX_LENGTH, CARD_CONTENT_MAX_LENGTH, CARD_TITLE_MAX_LENGTH } from '@constants/feed';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import { playgroundLink } from '@sopt-makers/playground-common';
import { fromNow } from '@utils/dayjs';
import truncateText from '@utils/truncateText';
import { useRouter } from 'next/router';

interface PostProps {
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

interface FeedItemProps {
  post: PostProps;
  HeaderSection?: React.ReactNode;
  LikeButton?: React.ReactNode;
  meetingId?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FeedItem = ({ post, HeaderSection, LikeButton, meetingId: _meetingId, onClick }: FeedItemProps) => {
  const { user, title, contents, images, updatedDate, commenterThumbnails, commentCount } = post;
  const router = useRouter();
  // NOTE: 게시글 상세페이지에선 router.query.id 가 post의 id 이기 때문에 meetingId를 주입받아야 한다.
  const meetingId = _meetingId ?? Number(router.query.id as string);
  const { data: meeting } = useQueryGetMeeting({ params: { id: String(meetingId) } });

  return (
    <SFeedItem onClick={onClick}>
      {HeaderSection}
      <STop>
        <Flex align="center">
          <SProfileButton
            onClick={e => {
              e.preventDefault();
              ampli.clickFeedProfile({ crew_status: meeting?.approved, location: router.pathname });
              window.location.href = `${playgroundLink.memberDetail(user.orgId)}`;
            }}
          >
            <SProfileImageWrapper>
              {user.profileImage ? <SProfileImage src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
            </SProfileImageWrapper>
            <SName>{user.name}</SName>
          </SProfileButton>
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

        {LikeButton}
      </SBottom>
    </SFeedItem>
  );
};

export default FeedItem;

const SFeedItem = styled('div', {
  padding: '$20 $20 $28 $20',
  background: '$gray900',
  borderRadius: '12px',
  color: '$gray10',
  width: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
  '@tablet': {
    padding: '$24 0 $28 0',
    background: 'transparent',
    borderRadius: 0,
    margin: '0 auto',
  },
});

const STop = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$12',
  mt: '$4',
});

const SProfileButton = styled('button', {
  flexType: 'verticalCenter',
  color: '$gray10',
});

const SProfileImageWrapper = styled('div', {
  width: '$32',
  height: '$32',
  objectFit: 'cover',
  borderRadius: '$round',
  background: '$gray700',
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
  color: '$gray500',
});

const STitle = styled('div', {
  mb: '$8',
  fontStyle: 'H3',

  '@tablet': {
    fontStyle: 'H4',
  },
});

const SContent = styled('div', {
  mb: '$20',
  color: '$gray200',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  '@tablet': {
    fontStyle: 'B3',
  },
});

const SThumbnailWrapper = styled('div', {
  position: 'relative',
});

const SThumbnail = styled('img', {
  display: 'block',
  mb: '$20',
  borderRadius: '8px',
  background: '$gray700',
  width: '100%',
  maxWidth: '$340',
  height: 'fit-content',
  aspectRatio: '4 / 3',
  objectFit: 'cover',

  '@tablet': {
    maxWidth: '100%',
  },
});

const SThumbnailCount = styled('div', {
  position: 'absolute',
  top: '12px',
  right: '12px',
  zIndex: 1,
  backgroundColor: '$gray950',
  opacity: 0.6,
  color: '$gray100',
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

const SBottom = styled('div', {
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
  color: '$gray200',
});

const SCommentCount = styled('span', {
  ml: '$4',
  fontStyle: 'H5',
});

const SOverlay = styled('div', {
  position: 'absolute',
  background: '$gray950',
  opacity: 0.7,
  width: '100%',
  height: '100%',
  flexType: 'center',
  color: '$gray10',
});
