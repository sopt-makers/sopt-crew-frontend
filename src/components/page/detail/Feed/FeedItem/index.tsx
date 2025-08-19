import AvatarGroup from '@components/@common/avatar/AvatarGroup';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
// import MoreIcon from '@assets/svg/more.svg';
import { ampli } from '@/ampli';
import { GetUser } from '@api/user/type';
import ClickedMenuIcon from '@assets/svg/clicked-menu-icon.svg';
import MenuIcon from '@assets/svg/menu_icon.svg';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import Avatar from '@components/@common/avatar/Avatar';
import { AVATAR_MAX_LENGTH, CARD_TITLE_MAX_LENGTH } from '@constants/feed';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { colors } from '@sopt-makers/colors';
import { playgroundLink } from '@sopt-makers/playground-common';
import { fromNow } from '@utils/dayjs';
import truncateText from '@utils/truncateText';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PostProps {
  id: number;
  user: GetUser[number];
  title: string;
  contents: string;
  images?: string[];
  createdDate: string;
  commenterThumbnails?: string[];
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
}

interface FeedItemProps {
  post: PostProps;
  HeaderSection?: React.ReactNode;
  LikeButton?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  meetingId?: number;
  Actions?: React.ReactNode[];
}

const FeedItem = ({ post, HeaderSection, LikeButton, onClick, Actions }: FeedItemProps) => {
  const { user, title, contents, images, createdDate, commenterThumbnails, commentCount } = post;
  const router = useRouter();
  const processString = () => {
    const regex = /-~!@#@(.*?)\[(\d+)\]%\^&\*\+/g;

    let matches;
    let lastIndex = 0;
    const content = [];

    // URL에서 호스트 부분 추출
    const host = window.location.origin;

    while ((matches = regex.exec(contents)) !== null) {
      if (matches.index > lastIndex) {
        content.push(contents?.substring(lastIndex, matches.index));
      }

      content.push(
        <SFeedContent>
          <Link href={host + '/members/' + matches[2]}>
            <p style={{ color: colors.success, display: 'inline' }}>@{matches[1]}</p>
          </Link>
        </SFeedContent>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < contents?.length) {
      content.push(contents?.substring(lastIndex));
    }

    return content;
  };

  return (
    <SFeedItem onClick={onClick}>
      {HeaderSection}
      <STop>
        <Flex align="center">
          <SProfileButton
            onClick={e => {
              e.preventDefault();
              ampli.clickFeedProfile({ location: router.pathname });
              window.location.href = `${playgroundLink.memberDetail(user.orgId)}`;
            }}
          >
            <SProfileImageWrapper>
              {user.profileImageUrl ? <SProfileImage src={user.profileImageUrl} alt="" /> : <ProfileDefaultIcon />}
            </SProfileImageWrapper>
            <SName>{user.userName}</SName>
          </SProfileButton>
          <STime>{fromNow(createdDate)}</STime>
        </Flex>
        <div onClick={e => e.preventDefault()} style={{ position: 'relative' }}>
          <DropdownMenu.Root>
            <STrigger>
              <MenuIcon data-icon="menu" />
              <ClickedMenuIcon data-icon="clicked-menu" />
            </STrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content asChild>
                <MenuItemsContainer>
                  {Actions?.map((Action, index) => (
                    <SMenuItemContainer>
                      <DropdownMenu.Item key={index}>{Action}</DropdownMenu.Item>
                    </SMenuItemContainer>
                  ))}
                </MenuItemsContainer>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </STop>

      <STitle>{truncateText(title, CARD_TITLE_MAX_LENGTH)}</STitle>
      <SContent>{processString()}</SContent>
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
  '@media (max-width: 768px)': {
    padding: '$24 0 $28 0',
    background: 'transparent',
    borderRadius: 0,
    margin: '0 auto',
  },
});

const SFeedContent = styled('div', {
  '& a::before': {
    content: 'none',
    display: 'inline-block',
  },
  display: 'inline-block',
});

const STop = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$12',
  mt: '$4',
});

const STrigger = styled(DropdownMenu.Trigger, {
  '& > [data-icon="menu"]': {
    display: 'display',
  },

  '& > [data-icon="clicked-menu"]': {
    display: 'none',
  },

  '&[data-state="open"] [data-icon="menu"]': {
    display: 'none',
  },
  '&[data-state="open"] [data-icon="clicked-menu"]': {
    display: 'block',
  },
});
const MenuItemsContainer = styled('div', {
  position: 'absolute',
  top: '4px',
  right: '-15px',
  padding: '8px',
  borderRadius: '13px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  background: '$gray800',
  zIndex: 2,
});
const SMenuItemContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  background: '$gray800',

  '&:hover': {
    background: '$gray700',
    borderRadius: '$8',
  },

  '&:active': {
    background: '$gray600',
    borderRadius: '$8',
  },
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
  wordBreak: 'break-all',
  '@media (max-width: 768px)': {
    fontStyle: 'H4',
  },
});

const SContent = styled('div', {
  mb: '$20',
  color: '$gray200',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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
