import LikeActiveIcon from '@assets/svg/like_active.svg';
import LikeDefaultIcon from '@assets/svg/like_default.svg';
import { LIKE_MAX_COUNT } from '@constants/feed';
import { styled } from 'stitches.config';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClickLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeButton({ isLiked, likeCount, onClickLike }: LikeButtonProps) {
  const formattedLikeCount = likeCount > LIKE_MAX_COUNT ? `${LIKE_MAX_COUNT}+` : likeCount;

  return (
    <SLikeButton like={isLiked} onClick={onClickLike}>
      {isLiked ? <LikeActiveIcon /> : <LikeDefaultIcon />}
      {formattedLikeCount}
    </SLikeButton>
  );
}

const SLikeButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'H5',

  variants: {
    like: {
      true: {
        color: '$red',
      },
      false: {
        color: '$gray10',
      },
    },
  },

  '& > svg': {
    mr: '$6',
  },
});
