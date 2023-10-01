import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import { Menu } from '@headlessui/react';
import { styled } from 'stitches.config';
import { paths } from '@/__generated__/schema';
import LikeIcon from 'public/assets/svg/like_in_comment.svg?v2';
import LikeFillIcon from 'public/assets/svg/like_fill_in_comment.svg?v2';
import { fromNow } from '@utils/dayjs';
import React from 'react';
import { playgroundURL } from '@constants/url';
import { playgroundLink } from '@sopt-makers/playground-common';

interface FeedCommentViewerProps {
  // TODO: API 응답을 바로 interface에 꽂지 말고 모델 만들어서 사용하자
  comment: paths['/comment/v1']['get']['responses']['200']['content']['application/json']['data']['comments'][number];
  isMine?: boolean;
  isPosterComment: boolean;
  Content: React.ReactNode;
  Actions: React.ReactNode[];
  onClickLike?: () => void;
}

export default function FeedCommentViewer({
  comment,
  isMine,
  isPosterComment,
  Content,
  Actions,
  onClickLike,
}: FeedCommentViewerProps) {
  return (
    <Container>
      <CommentHeader>
        <AuthorWrapper href={`${playgroundURL}${playgroundLink.memberDetail(comment.user.orgId)}`}>
          <Avatar src={comment.user.profileImage || ''} alt={comment.user.name} sx={{ width: 28, height: 28 }} />
          <Name>
            {comment.user.name}
            {isPosterComment ? '(글쓴이)' : ''}
          </Name>
          <Date>{fromNow(comment.updatedDate)}</Date>
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
      </CommentHeader>

      <CommentBody>
        <CommentContents>{Content}</CommentContents>
        <CommentLikeWrapper>
          <LikeWrapper onClick={onClickLike}>
            <LikeIconWrapper>{comment.isLiked ? <LikeFillIcon /> : <LikeIcon />}</LikeIconWrapper>
            <LikeCount>{comment.likeCount}</LikeCount>
          </LikeWrapper>
        </CommentLikeWrapper>
      </CommentBody>
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '8px',
});
const CommentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const AuthorWrapper = styled('a', {
  flexType: 'verticalCenter',
});
const Name = styled('span', {
  display: 'inline-block',
  marginLeft: '8px',
  color: '$gray30',
  fontStyle: 'T5',
});
const Date = styled('span', {
  display: 'inline-block',
  marginLeft: '4px',
  color: '$gray100',
  fontStyle: 'T6',
});
const MenuItems = styled(Menu.Items, {
  position: 'absolute',
  top: 0,
  right: '100%', // TODO: design 체크 필요
});
const CommentBody = styled('div', {
  paddingLeft: '40px',
  paddingRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
const CommentContents = styled('div', {
  color: '$gray30',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
});
const CommentLikeWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '12px',
});
const LikeWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '4px',
  userSelect: 'none',
  cursor: 'pointer',
});
const LikeIconWrapper = styled('div', {
  width: '20px',
  height: '20px',
  color: '$gray60',
});
const LikeCount = styled('span', {
  color: '$gray60',
  fontStyle: 'B4',
});
