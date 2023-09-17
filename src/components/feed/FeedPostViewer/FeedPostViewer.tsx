import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import CommentIcon from 'public/assets/svg/comment.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';
import SendIcon from 'public/assets/svg/send.svg';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';

interface FeedPostViewerProps {
  post: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];
  Actions: React.ReactNode[];
}

export default function FeedPostViewer({ post, Actions }: FeedPostViewerProps) {
  return (
    <Container>
      <ContentWrapper>
        <ContentHeader>
          <AuthorWrapper>
            <Avatar src={post.user.profileImage || ''} alt={post.user.name} />
            <AuthorInfo>
              <AuthorName>{post.user.name}</AuthorName>
              <UpdatedDate>{post.updatedDate}</UpdatedDate>
            </AuthorInfo>
          </AuthorWrapper>
          <Menu as="div" style={{ position: 'relative' }}>
            <Menu.Button>
              <MenuIcon />
            </Menu.Button>
            <MenuItems>
              {Actions.map(Action => (
                <Menu.Item>
                  <MenuItem>{Action}</MenuItem>
                </Menu.Item>
              ))}
            </MenuItems>
          </Menu>
        </ContentHeader>
        <ContentBody>
          <Title>{post.title}</Title>
          <Contents>{post.contents}</Contents>
          {post.images && (
            <ImageSection>
              {post.images.length === 1 ? (
                <BigImage src={post.images[0]} />
              ) : (
                <ImageListWrapper>
                  {post.images.map((image, index) => (
                    <ImageListItem key={index} src={image} />
                  ))}
                </ImageListWrapper>
              )}
            </ImageSection>
          )}
          <ViewCount>조회 {post.viewCount}회</ViewCount>
        </ContentBody>
      </ContentWrapper>

      <CommentLikeWrapper>
        <CommentIcon />
        <CommentLike>
          {/* TODO: add comment count */}
          <span>댓글 </span>
        </CommentLike>
        <Divider />
        {post.isLiked ? <LikeFillIcon /> : <LikeIcon />}
        <CommentLike>
          <span>좋아요 {post.likeCount}</span>
        </CommentLike>
      </CommentLikeWrapper>

      <CommentListWrapper>
        {/* 댓글 목록 */}
        <div></div>
        <CommentInputWrapper>
          <CommentInput placeholder="댓글 입력" />
          <SendButton>
            <SendIcon />
          </SendButton>
        </CommentInputWrapper>
      </CommentListWrapper>
    </Container>
  );
}

const Container = styled(Box, {
  width: '800px',
  flexShrink: 0,
  borderRadius: '20px',
  border: '1px solid $black60',
  background: '$black100',
});
const ContentWrapper = styled('div', {
  padding: '36px 24px 28px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});
const ContentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const AuthorWrapper = styled('div', {
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
  color: '$white100',
  fontStyle: 'H5',
});
const UpdatedDate = styled('span', {
  color: '$gray60',
  fontStyle: 'B4',
});
const ContentBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
const Title = styled('h2', {
  color: 'white',
  fontStyle: 'H2',
});
const Contents = styled('p', {
  mt: '$12',
  color: '$gray30',
  fontStyle: 'B2',
});
const ImageSection = styled('section', {
  paddingRight: '25px',
  marginTop: '20px',
  marginBottom: '12px',
});
const BigImage = styled('img', {
  width: '100%',
  height: '453px',
  objectFit: 'cover',
  borderRadius: '10px',
});
const ImageListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '8px',
});
const ImageListItem = styled('img', {
  width: '100%',
  height: '136px',
  objectFit: 'cover',
  borderRadius: '8px',
});
const ViewCount = styled('span', {
  mt: '$16',
  marginRight: '20px', // TODO: design 체크 필요
  alignSelf: 'flex-end',
  color: '$gray100',
  fontStyle: 'B4',
});
const MenuItems = styled(Menu.Items, {
  position: 'absolute',
  top: 0,
  right: '100%', // TODO: design 체크 필요
});
const MenuItem = styled('button', {
  display: 'flex',
  width: '147px',
  padding: '8px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$white100',
  background: '$black80',
  fontStyle: 'B3',
  border: '1px solid $black40',
  '&:first-child': {
    borderRadius: '14px 14px 0 0',
    borderBottom: 'none',
  },
  '&:last-child': {
    borderRadius: '0 0 14px 14px ',
    borderTop: 'none',
  },
});

const CommentLikeWrapper = styled('div', {
  color: '$gray08',
  fontStyle: 'T5',
  height: '48px',
  flexType: 'center',
  borderTop: '1px solid $black60',
  borderBottom: '1px solid $black60',
});

const Divider = styled('div', {
  background: '$black60',
  width: '1px',
  height: '24px',
  margin: '12px 159px 12px 171px',
});

const CommentLike = styled('div', {
  color: '$gray80',
  fontStyle: 'T5',
  marginLeft: '4px',
});
const CommentListWrapper = styled('div', {
  padding: '28px 28px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});
const CommentInputWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '16px',
});
const CommentInput = styled('input', {
  width: '692px',
  padding: '14px 24px',
  borderRadius: '50px',
  background: '$black60',
  color: '$gray40',
  fontStyle: 'B2',
  '&::placeholder': {
    color: '$gray60',
  },
});
const SendButton = styled('button', {
  width: '32px',
  height: '32px',
});
