import { styled } from 'stitches.config';
import CommentIcon from 'public/assets/svg/comment.svg';
import CommentHoverIcon from 'public/assets/svg/comment_hover.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeHoverIcon from 'public/assets/svg/like_hover.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';

interface FeedCommentLikeSectionProps {
  isLiked: boolean;
  commentCount: number;
  likeCount: number;
  onClickComment: () => void;
  onClickLike: () => void;
}

export default function FeedCommentLikeSection({
  isLiked,
  commentCount,
  likeCount,
  onClickComment,
  onClickLike,
}: FeedCommentLikeSectionProps) {
  return (
    <>
      <CommentWrapper onClick={onClickComment}>
        <StyledCommentIcon />
        <StyledCommentHoverIcon />
        <span style={{ marginLeft: '4px' }}>댓글 {commentCount}</span>
      </CommentWrapper>
      <Divider />
      <LikeWrapper onClick={onClickLike} isLiked={isLiked}>
        {isLiked ? (
          <LikeFillIcon />
        ) : (
          <>
            <StyledLikeIcon />
            <StyledLikeHoverIcon />
          </>
        )}
        <Like isLiked={isLiked}>좋아요 {likeCount}</Like>
      </LikeWrapper>
    </>
  );
}

const Divider = styled('div', {
  background: '$gray700',
  width: '1px',
  height: '24px',
});
const CommentWrapper = styled('button', {
  width: '400px',
  display: 'flex',
  flexType: 'center',
  color: '$gray300',
  fontStyle: 'T5',
  '@tablet': {
    width: '50%',
    fontStyle: 'T6',
  },
  '&:hover svg:first-of-type': {
    display: 'none',
  },
  '&:hover svg:last-of-type': {
    display: 'block',
  },
});
const StyledCommentIcon = styled(CommentIcon, {
  display: 'block',
});
const StyledCommentHoverIcon = styled(CommentHoverIcon, {
  display: 'none',
});
const LikeWrapper = styled(CommentWrapper, {
  cursor: 'pointer',
  userSelect: 'none',
  variants: {
    isLiked: {
      true: {
        '&:hover svg:first-of-type': {
          display: 'block',
        },
      },
    },
  },
  '&:hover svg:first-of-type': {
    display: 'none',
  },
  '&:hover svg:nth-of-type(2)': {
    display: 'block',
  },
});
const StyledLikeIcon = styled(LikeIcon, {
  display: 'block',
});
const StyledLikeHoverIcon = styled(LikeHoverIcon, {
  display: 'none',
});
const Like = styled('span', {
  marginLeft: '4px',
  variants: {
    isLiked: {
      true: {
        color: '#D70067',
      },
    },
  },
});
