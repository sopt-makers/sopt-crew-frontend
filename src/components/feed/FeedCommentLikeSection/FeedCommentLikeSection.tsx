import { styled } from 'stitches.config';
import CommentIcon from 'public/assets/svg/comment.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';

interface FeedCommentLikeSectionProps {
  isLiked: boolean;
  commentCount: number;
  likeCount: number;
  onClickLike: () => void;
}

export default function FeedCommentLikeSection({
  isLiked,
  commentCount,
  likeCount,
  onClickLike,
}: FeedCommentLikeSectionProps) {
  return (
    <>
      <CommentWrapper>
        <CommentIcon />
        <span style={{ marginLeft: '4px' }}>댓글 {commentCount}</span>
      </CommentWrapper>
      <Divider />
      <LikeWrapper onClick={onClickLike}>
        {isLiked ? <LikeFillIcon /> : <LikeIcon />}
        <Like isLiked={isLiked}>좋아요 {likeCount}</Like>
      </LikeWrapper>
    </>
  );
}

const Divider = styled('div', {
  background: '$black60',
  width: '1px',
  height: '24px',
});
const CommentWrapper = styled('div', {
  width: '400px',
  display: 'flex',
  flexType: 'center',
  color: '$gray80',
  fontStyle: 'T5',
  '@tablet': {
    width: '50%',
    fontStyle: 'T6',
  },
});
const LikeWrapper = styled(CommentWrapper, {
  cursor: 'pointer',
  userSelect: 'none',
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