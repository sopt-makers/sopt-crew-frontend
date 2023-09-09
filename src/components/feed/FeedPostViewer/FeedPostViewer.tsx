import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import CommentIcon from 'public/assets/svg/comment.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';
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
          <ViewCount>{post.viewCount}</ViewCount>
        </ContentBody>
      </ContentWrapper>

      <div>
        <div>
          <CommentIcon />
          {/* TODO: add comment count */}
          <span>댓글 </span>
        </div>
        <div>
          {post.isLiked ? <LikeFillIcon /> : <LikeIcon />}
          <span>좋아요 {post.likeCount}</span>
        </div>
      </div>
    </Container>
  );
}

const Container = styled(Box, {
  width: '800px',
  height: '496px',
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
