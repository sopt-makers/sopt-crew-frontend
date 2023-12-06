import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import ShareIcon from 'public/assets/svg/share.svg';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import ArrowIcon from '@assets/svg/arrow_card.svg';
import { styled } from 'stitches.config';
import { useOverlay } from '@hooks/useOverlay/Index';
import ImageCarouselModal from '@components/modal/ImageCarouselModal';
import { fromNow } from '@utils/dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { playgroundURL } from '@constants/url';
import { playgroundLink } from '@sopt-makers/playground-common';
import { parseTextToLink } from '@components/util/parseTextToLink';
import useToast from '@hooks/useToast';
import Link from 'next/link';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface FeedPostViewerProps {
  post: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json']['data'];
  Actions: React.ReactNode[];
  CommentLikeSection: React.ReactNode;
  CommentList: React.ReactNode;
  CommentInput: React.ReactNode;
  onClickImage?: () => void;
  onClickAuthor?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function FeedPostViewer({
  post,
  Actions,
  CommentLikeSection,
  CommentList,
  CommentInput,
  onClickImage,
  onClickAuthor,
}: FeedPostViewerProps) {
  const overlay = useOverlay();
  const showToast = useToast();

  const handleClickShare = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      showToast({ type: 'info', message: '링크를 복사했어요.' });
    } catch (e) {
      showToast({ type: 'error', message: '링크 복사에 실패했어요. 다시 시도해 주세요.' });
    }
  };

  const handleClickImage = (images: string[], startIndex: number) => () => {
    onClickImage?.();
    overlay.open(({ isOpen, close }) => (
      <ImageCarouselModal isOpen={isOpen} close={close} images={images} startIndex={startIndex} />
    ));
  };

  return (
    <Container>
      <ContentWrapper>
        <ContentHeader>
          <AuthorWrapper
            href={`${playgroundURL}${playgroundLink.memberDetail(post.user.orgId)}`}
            onClick={onClickAuthor}
          >
            <SAvatar src={post.user.profileImage || ''} alt={post.user.name} />
            <AuthorInfo>
              <AuthorName>{post.user.name}</AuthorName>
              <UpdatedDate>{fromNow(post.updatedDate)}</UpdatedDate>
            </AuthorInfo>
          </AuthorWrapper>
          <ButtonContainer>
            <button onClick={handleClickShare}>
              <ShareIcon />
            </button>
            <Menu as="div" style={{ position: 'relative' }}>
              <Menu.Button>
                <MenuIcon />
              </Menu.Button>
              <MenuItems>
                {Actions.map((Action, index) => (
                  <Menu.Item key={index}>{Action}</Menu.Item>
                ))}
              </MenuItems>
            </Menu>
          </ButtonContainer>
        </ContentHeader>
        <ContentBody>
          <Title>{post.title}</Title>
          <Contents>{parseTextToLink(post.contents)}</Contents>
          {post.images && post.images.length > 0 && (
            <ImageSection>
              {post.images.length === 1 ? (
                <BigImage src={post.images[0]} onClick={handleClickImage(post.images, 0)} />
              ) : (
                <ImageListWrapper>
                  {post.images.map((image, index) => (
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    <ImageListItem key={index} src={image} onClick={handleClickImage(post.images!, index)} />
                  ))}
                </ImageListWrapper>
              )}
            </ImageSection>
          )}
          <ViewCount>조회 {post.viewCount}회</ViewCount>
        </ContentBody>
        <Link href={`/detail?id=${post.meeting.id}`} passHref>
          <GroupButton>
            <GroupThumbnail src={post.meeting.imageURL[0].url} alt="" />
            <GroupInformation>
              <div>
                <span>{post.meeting.category}</span>
                <span>{post.meeting.title}</span>
              </div>
              {/* TODO: API 배포 후 모임 소개 수정 예정 */}
              <GroupDescription>모임 소개</GroupDescription>
            </GroupInformation>
            <ArrowIcon />
          </GroupButton>
        </Link>
      </ContentWrapper>

      <CommentLikeWrapper>{CommentLikeSection}</CommentLikeWrapper>

      <CommentListWrapper>
        {CommentList}
        {CommentInput}
      </CommentListWrapper>
    </Container>
  );
}

const Container = styled('div', {
  width: '800px',
  flexShrink: 0,
  borderRadius: '20px',
  border: '1px solid $gray700',
  background: '$gray950',
  mb: '$80',
  '@tablet': {
    width: '100%',
    border: 'none',
    mb: '$0',
  },
});
const ContentWrapper = styled('div', {
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@tablet': {
    gap: '16px',
    padding: '0 0 20px 0',
  },
});
const ContentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '12px',
});
const AuthorWrapper = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
const AuthorInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
});
const AuthorName = styled('span', {
  color: '$gray10',
  fontStyle: 'H5',
});
const UpdatedDate = styled('span', {
  color: '$gray300',
  fontStyle: 'B4',
});
const ContentBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
const GroupButton = styled('a', {
  display: 'flex',
  gap: '$16',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$gray800',
  width: '100%',
  height: '102px',
  padding: '$18 $20',
  borderRadius: '12px',
  '&:hover': {
    outline: '1px solid $gray500',
  },
  '@tablet': {
    height: 'fit-content',
    padding: '$14 $12',
  },
});
const GroupThumbnail = styled('img', {
  width: '88px',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  '@tablet': {
    display: 'none',
  },
});
const GroupInformation = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  gap: '8px',
  color: '$gray100',
  'span + span': {
    marginLeft: '$8',
    '@tablet': {
      marginLeft: '$6',
    },
  },
  'span:first-child': {
    color: '$secondary',
  },
  'span:last-child': {
    color: '$gray30',
  },
});
const GroupDescription = styled('p', {
  height: '$40',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  '@tablet': {
    display: 'none',
  },
});
const Title = styled('h2', {
  color: 'white',
  fontStyle: 'H2',
  '@tablet': {
    fontStyle: 'H4',
  },
});
const Contents = styled('p', {
  mt: '$12',
  color: '$gray100',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  '@tablet': {
    fontStyle: 'B3',
  },
});
const ImageSection = styled('section', {
  margin: '24px 0',
  '@tablet': {
    margin: '16px 0',
  },
});
const BigImage = styled('img', {
  width: '100%',
  height: '453px',
  objectFit: 'cover',
  borderRadius: '10px',
  cursor: 'pointer',
  '@tablet': {
    height: '219px',
  },
});
const ImageListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '8px',
  '@tablet': {
    display: 'flex',
    gap: '6px',
    overflowX: 'scroll',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
const ImageListItem = styled('img', {
  width: '100%',
  height: '136px',
  objectFit: 'cover',
  borderRadius: '8px',
  cursor: 'pointer',
  '@tablet': {
    height: '144px',
  },
});
const ViewCount = styled('span', {
  alignSelf: 'flex-end',
  color: '$gray200',
  fontStyle: 'B4',
  '@tablet': {
    fontStyle: 'C1',
  },
});
const MenuItems = styled(Menu.Items, {
  position: 'absolute',
  top: 0,
  right: '100%', // TODO: design 체크 필요
});
const CommentLikeWrapper = styled('div', {
  color: '$gray08',
  fontStyle: 'T5',
  height: '48px',
  flexType: 'center',
  borderTop: '1px solid $gray700',
  borderBottom: '1px solid $gray700',
  '@tablet': {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
  },
});
const CommentListWrapper = styled('div', {
  padding: '28px 28px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  '@tablet': {
    padding: '24px 0 32px 0',
    gap: '36px',
  },
});
const SAvatar = styled(Avatar, {
  '@tablet': {
    width: '40px',
    height: '40px',
  },
});
