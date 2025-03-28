import { paths } from '@/__generated__/schema2';
import LikeHoverIcon from '@assets/svg/like_hover_in_comment.svg';
import MessageIcon from '@assets/svg/message-dots.svg';
import ReCommentHoverIcon from '@assets/svg/Recomment_Hover_Icon.svg';
import Avatar from '@components/@common/avatar/Avatar';
import { playgroundURL } from '@constants/url';
import { Menu } from '@headlessui/react';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { playgroundLink } from '@sopt-makers/playground-common';
import { fromNow } from '@utils/dayjs';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import LikeFillIcon from 'public/assets/svg/like_fill_in_comment.svg';
import LikeIcon from 'public/assets/svg/like_in_comment.svg';
import React, { useContext } from 'react';
import { styled } from 'stitches.config';
import { MentionContext } from '../Mention/MentionContext';

interface FeedCommentViewerProps {
  // TODO: API 응답을 바로 interface에 꽂지 말고 모델 만들어서 사용하자
  comment:
    | paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number]
    | paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number]['replies'][number];
  commentParentId?: number; // 부모가 댓글이라면 commentParentId 로 부모 댓글의 Id 를 넘겨줍니다.
  isMine?: boolean;
  isPosterComment: boolean;
  Content: React.ReactNode;
  Actions: React.ReactNode[];
  onClickLike?: (commentId: number) => void;
}

export default function FeedCommentViewer({
  comment,
  commentParentId,
  isPosterComment,
  Content,
  Actions,
  onClickLike,
}: FeedCommentViewerProps) {
  const { setUser, setIsReCommentClicked, setParentComment } = useContext(MentionContext);

  const onClickReComment = () => {
    setIsReCommentClicked(true);
    //commentParentId: 본인의 부모 댓글의 id, parentComment: 본인이 부모 댓글 여부
    if (commentParentId) {
      setParentComment({ parentComment: false, parentCommentId: commentParentId });
    } else {
      setParentComment({ parentComment: false, parentCommentId: comment.id });
    }
    setUser({ userName: comment.user.name, userId: comment.user.orgId });
  };

  return (
    <Container>
      <CommentHeader>
        <AuthorWrapper href={`${playgroundURL}${playgroundLink.memberDetail(comment.user.orgId)}`}>
          <Avatar src={comment.user.profileImage || ''} alt={comment.user.name} sx={{ width: 28, height: 28 }} />
          <Name>
            {comment.user.name}
            {isPosterComment ? '(글쓴이)' : ''}
          </Name>
          <Date>{fromNow(comment.createdDate)}</Date>
        </AuthorWrapper>
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
      </CommentHeader>

      <CommentBody>
        <CommentContents>{Content}</CommentContents>
        <CommentLikeWrapper>
          <LikeWrapper onClick={() => onClickLike && onClickLike(comment.id)}>
            <LikeIconWrapper isLiked={comment.isLiked}>
              {comment.isLiked ? (
                <LikeFillIcon />
              ) : (
                <>
                  <SLikeIcon />
                  <SLikeHoverIcon />
                </>
              )}
            </LikeIconWrapper>
            <LikeCount>{comment.likeCount}</LikeCount>
          </LikeWrapper>
          <ReCommentWrapper onClick={onClickReComment}>
            <MessageIconWrapper>
              <SMessageIcon />
              <SMessageHoverIcon />
            </MessageIconWrapper>
            답글 달기
          </ReCommentWrapper>
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
  width: '100%',
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
  color: '$gray100',
  fontStyle: 'T5',
});
const Date = styled('span', {
  display: 'inline-block',
  marginLeft: '4px',
  color: '$gray500',
  fontStyle: 'T6',
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
const CommentBody = styled('div', {
  paddingLeft: '40px',
  paddingRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
const CommentContents = styled('div', {
  color: '$gray100',
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
const SLikeIcon = styled(LikeIcon, {
  display: 'block',
});
const SLikeHoverIcon = styled(LikeHoverIcon, {
  display: 'none',
});
const LikeIconWrapper = styled('div', {
  width: '20px',
  height: '20px',
  color: '$gray300',
  display: 'flex',
  flexType: 'center',
  '&:hover svg:first-of-type': {
    display: 'none',
  },
  '&:hover svg:nth-of-type(2)': {
    display: 'block',
  },
  variants: {
    isLiked: {
      true: {
        '&:hover svg:first-of-type': {
          display: 'block',
        },
      },
    },
  },
});
const LikeCount = styled('span', {
  color: '$gray300',
  fontStyle: 'B4',
});
const ReCommentWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '4px',
  userSelect: 'none',
  cursor: 'pointer',
  color: '$gray300',
  ...fontsObject.LABEL_4_12_SB,
});
const MessageIconWrapper = styled('div', {
  width: '20px',
  height: '20px',
  color: '$gray300',
  display: 'flex',
  flexType: 'center',
  '&:hover svg:first-of-type': {
    display: 'none',
  },
  '&:hover svg:nth-of-type(2)': {
    display: 'block',
  },
});
const SMessageHoverIcon = styled(ReCommentHoverIcon, {
  display: 'none',
  fill: colors.gray300,
});
const SMessageIcon = styled(MessageIcon, {
  display: 'block',
});
