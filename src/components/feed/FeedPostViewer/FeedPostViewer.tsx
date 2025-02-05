import { Menu } from '@headlessui/react';
import Avatar from '@components/@common/avatar/Avatar';
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
import { useToast } from '@sopt-makers/ui';
import Link from 'next/link';
import { CATEGORY_OPTIONS } from '@constants/option';
import { paths } from '@/__generated__/schema2';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface FeedPostViewerProps {
  post: paths['/post/v2/{postId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
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
  const { open } = useToast();

  const handleClickShare = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      open({
        icon: 'success',
        content: '링크를 복사했어요.',
      });
    } catch (e) {
      open({
        icon: 'error',
        content: '링크 복사에 실패했어요. 다시 시도해 주세요.',
      });
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
              <UpdatedDate>{fromNow(post.createdDate)}</UpdatedDate>
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
                  <SMenuItemContainer>
                    <Menu.Item key={index}>{Action}</Menu.Item>
                  </SMenuItemContainer>
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
        <Link href={`/detail?id=${post.meeting.id}`} passHref legacyBehavior>
          <GroupButton>
            <GroupThumbnail src={post.meeting.imageURL[0]?.url} alt="" />
            <GroupInformation>
              <div>
                <GroupCategory isStudy={post.meeting.category === CATEGORY_OPTIONS[0]}>
                  {post.meeting.category}
                </GroupCategory>
                <span>{post.meeting.title}</span>
              </div>
              <GroupDescription>{post.meeting.desc}</GroupDescription>
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
  height: '100%',
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
  gap: '16px',
});
const AuthorInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
});
const AuthorName = styled('span', {
  color: '$gray10',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '22px',
  '@tablet': {
    fontSize: '14px',
    lineHeight: '18px',
  },
});
const UpdatedDate = styled('span', {
  color: '$gray300',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '18px',
  '@tablet': {
    fontSize: '12px',
    lineHeight: '16px',
  },
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
    padding: '$14 $12 $14 $14',
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
  fontSize: '13px',
  lineHeight: '20px',
  span: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
    '@tablet': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  'span + span': {
    marginLeft: '$8',
    '@tablet': {
      marginLeft: '$6',
    },
  },
  'span:last-child': {
    color: '$gray30',
  },
});
const GroupCategory = styled('span', {
  variants: {
    isStudy: {
      true: { color: '$secondary' },
      false: { color: '$success' },
    },
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
  top: '35px', // TODO: design 체크 필요
  right: '0', // TODO: design 체크 필요
  padding: '8px',
  borderRadius: '13px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  background: '$gray800',
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
  width: '44px',
  height: '44px',
  '@tablet': {
    width: '40px',
    height: '40px',
  },
  svg: {
    width: '44px',
    height: '44px',
  },
});
