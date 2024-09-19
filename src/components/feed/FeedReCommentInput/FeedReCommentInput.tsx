import RecommentPointIcon from '@assets/svg/recomment_point_icon.svg';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import { forwardRef, useRef, useState } from 'react';
import { styled } from 'stitches.config';
import { FeedCommentInputProps } from '../FeedCommentInput/FeedCommentInput';
import CommonMention from '../Mention';

const FeedReCommentInput = forwardRef<HTMLTextAreaElement, Omit<FeedCommentInputProps, 'writerName'>>(
  ({ commentId, onSubmit, disabled }) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [userIds, setUserIds] = useState<number[] | null>(null);

    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get('id'));
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!comment.trim()) return;
      onSubmit({
        postId: postId as number,
        orgIds: userIds,
        content: comment,
      }).then(() => {
        setComment('');
        setIsFocused(false);
      });
    };

    return (
      <div style={{ display: 'flex' }}>
        <RecommentPointIcon style={{ marginRight: '12px' }} />
        <Container isFocused={isFocused}>
          <CommentInput>
            <CommonMention
              inputRef={inputRef}
              value={comment}
              setValue={setComment}
              placeholder={`대댓글을 남겨보세요!`}
              setIsFocused={setIsFocused}
              setUserIds={setUserIds}
              isComment={true}
              commentId={commentId}
            />
          </CommentInput>

          <SendButton type="submit" onClick={handleSubmit} disabled={disabled}>
            {isFocused ? <SendFillIcon /> : <SendIcon />}
          </SendButton>
        </Container>
      </div>
    );
  }
);

//$gray800 이런건 theme인건가?
const Container = styled('form', {
  width: '100%',
  background: '$gray800',
  flexType: 'verticalCenter',
  borderRadius: '10px',
  variants: {
    isFocused: {
      true: {
        border: '1px solid $gray200',
      },
      false: {
        border: 'none',
      },
    },
  },
});
const CommentInput = styled('div', {
  minWidth: 0,
  width: '100%',
  padding: '11px 16px',
  borderRadius: '10px',
  background: '$gray800',
  border: 'none',
  outline: 'none',
  resize: 'none',
  '&': {
    color: '$gray300',
  },

  '@tablet': {
    position: 'relative',
  },
});
const SendButton = styled('button', {
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default FeedReCommentInput;
