import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import { Menu } from '@headlessui/react';
import { styled } from 'stitches.config';
import { paths } from '@/__generated__/schema';
import LikeIcon from 'public/assets/svg/like_in_comment.svg?v2';
import LikeFillIcon from 'public/assets/svg/like_fill_in_comment.svg?v2';
import { fromNow } from '@utils/dayjs';
import ConfirmModal from '@components/modal/ConfirmModal';

interface FeedCommentViewerProps {
  // TODO: API 응답을 바로 interface에 꽂지 말고 모델 만들어서 사용하자
  comment: paths['/comment/v1']['get']['responses']['200']['content']['application/json']['comments'][number];
  isMine?: boolean;
  Actions: React.ReactNode[];
  onClickLike?: () => void;
}

export default function FeedCommentViewer({ comment, isMine, Actions, onClickLike }: FeedCommentViewerProps) {
  const handleModalClose = () => {
    console.log('close');
  };
  const handleConfirm = () => {
    console.log('confirm');
  };

  return (
    <Container>
      <CommentHeader>
        <AuthorWrapper>
          <Avatar src={comment.user.profileImage || ''} alt={comment.user.name} sx={{ width: 28, height: 28 }} />
          <Name>
            {comment.user.name}
            {isMine ? '(글쓴이)' : ''}
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
                <Menu.Item key={index}>
                  <MenuItem>{Action}</MenuItem>
                </Menu.Item>
              ))}
            </MenuItems>
          </Menu>
        )}
      </CommentHeader>

      <CommentBody>
        <CommentContents>{comment.contents}</CommentContents>
        <CommentLikeWrapper>
          <LikeWrapper onClick={onClickLike}>
            <LikeIconWrapper>{comment.isLiked ? <LikeFillIcon /> : <LikeIcon />}</LikeIconWrapper>
            <LikeCount>{comment.likeCount}</LikeCount>
          </LikeWrapper>
        </CommentLikeWrapper>
      </CommentBody>
      <ConfirmModal
        isModalOpened={true}
        message="댓글을 삭제하시겠습니까?"
        cancelButton="돌아가기"
        confirmButton="삭제하기"
        handleModalClose={handleModalClose}
        handleConfirm={handleConfirm}
      ></ConfirmModal>
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
const AuthorWrapper = styled('div', {
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
const MenuItem = styled('button', {
  flexType: 'center',
  width: '147px',
  padding: '8px 16px',
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
const CommentBody = styled('div', {
  paddingLeft: '40px',
  paddingRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
const CommentContents = styled('p', {
  color: '$gray30',
  fontStyle: 'B2',
});
const CommentLikeWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '12px',
});
const LikeWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '4px',
  userSelect: 'none',
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
