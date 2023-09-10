import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import CommentIcon from 'public/assets/svg/comment.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';
import SendIcon from 'public/assets/svg/send.svg';
import RecentFeedLikeIcon from 'public/assets/svg/recent_feed_like.svg';
import RecentFeedCommentIcon from 'public/assets/svg/recent_feed_comment.svg';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';

interface FeedPostViewerProps {
  post: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];
  Actions: React.ReactNode[];
}

export default function FeedPostViewer({ post, Actions }: FeedPostViewerProps) {
  return (
    <FeedContainer>
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
      <RecentFeedWrapper>
        <RecentFeedHeader>최신 피드</RecentFeedHeader>
        <RecentFeedText>
          <RecentFeedTitle>제목이 완전 길어서 잘리는 것까지 보려고 넣어놓..</RecentFeedTitle>
          <RecentFeedContent>1번 김현우 2번 오영주 3번 임현주 4번 박지현 5번 기타</RecentFeedContent>
          <RecentFeedLikeCommentWrapper>
            <RecentFeedLikeIcon style={{ marginRight: '4px' }} />
            {182}
            <RecentFeedCommentIcon style={{ marginRight: '4px', marginLeft: '12px' }} />
            {2}
          </RecentFeedLikeCommentWrapper>
        </RecentFeedText>
        <RecentFeedText>
          <RecentFeedTitle>제목 짧을 때</RecentFeedTitle>
          <RecentFeedContent>내용도 짧을 때</RecentFeedContent>
          <RecentFeedLikeCommentWrapper>
            <RecentFeedLikeIcon style={{ marginRight: '4px' }} />
            {0}
            <RecentFeedCommentIcon style={{ marginRight: '4px', marginLeft: '12px' }} />
            {0}
          </RecentFeedLikeCommentWrapper>
        </RecentFeedText>
        <RecentFeedText>
          <RecentFeedTitle>제목이 적당한 길이 15-20자 </RecentFeedTitle>
          <RecentFeedContent>내용은 한 줄만 표시. 최대 길이도 한 줄. 이건 글자수로 몇..</RecentFeedContent>
          <RecentFeedLikeCommentWrapper>
            <RecentFeedLikeIcon style={{ marginRight: '4px' }} />
            {21}
            <RecentFeedCommentIcon style={{ marginRight: '4px', marginLeft: '12px' }} />
            {2}
          </RecentFeedLikeCommentWrapper>
        </RecentFeedText>
      </RecentFeedWrapper>
    </FeedContainer>
  );
}

const FeedContainer = styled('div', {
  display: 'flex',
});
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
const RecentFeedWrapper = styled('div', {
  display: 'flex',
  width: '368px',
  height: '440px',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: '0',
  borderRadius: '16px',
  background: '$black80',
  marginLeft: '32px',
});
const RecentFeedHeader = styled('div', {
  color: '$white100',
  fontStyle: 'H2',
  alignSelf: 'flex-start',
  margin: '32px 0px 28px 24px',
});
const RecentFeedText = styled('div', {
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingBottom: '16px',
  marginBottom: '16px',
  borderBottom: '1px solid $black60',
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: '0px',
    marginBottom: '0px',
  },
});
const RecentFeedTitle = styled('div', {
  color: '$gray40',
  fontStyle: 'H4',
  marginBottom: '8px',
});
const RecentFeedContent = styled('div', {
  flexShrink: '0',
  color: '$gray80',
  fontStyle: 'B3',
  marginBottom: '10px',
});
const RecentFeedLikeCommentWrapper = styled('div', {
  display: 'flex',
  color: '$gray60',
  fontStyle: 'B4',
});
