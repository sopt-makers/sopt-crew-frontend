import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
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
dayjs.extend(relativeTime);
dayjs.locale('ko');

interface FeedPostViewerProps {
  post: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json']['data'];
  isMine?: boolean;
  Actions: React.ReactNode[];
  CommentLikeSection: React.ReactNode;
  CommentList: React.ReactNode;
  CommentInput: React.ReactNode;
  onClickImage?: () => void;
  onClickAuthor?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function FeedPostViewer({
  post,
  isMine,
  Actions,
  CommentLikeSection,
  CommentList,
  CommentInput,
  onClickImage,
  onClickAuthor,
}: FeedPostViewerProps) {
  const overlay = useOverlay();

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
          {isMine && (
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
          )}
        </ContentHeader>
        <ContentBody>
          <Title>{post.title}</Title>
          <Contents>{parseTextToLink(post.contents)}</Contents>
          {post.images && (
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
  padding: '36px 24px 28px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  '@tablet': {
    padding: '0 0 20px 0',
  },
});
const ContentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  paddingRight: '16px',
  marginTop: '20px',
  marginBottom: '12px',
  '@tablet': {
    paddingRight: 0,
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
    overflow: 'scroll',
    gap: '6px',
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
  mt: '$16',
  mr: '$16', // TODO: design 체크 필요 > 체크 완료
  alignSelf: 'flex-end',
  color: '$gray100',
  fontStyle: 'B4',
  '@tablet': {
    mr: '$0',
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
