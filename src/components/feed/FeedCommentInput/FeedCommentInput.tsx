import { styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import React, { forwardRef, useState } from 'react';

interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
}

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled }, ref) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length === 0) {
        e.target.style.height = 'auto';
      } else {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      setComment(e.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!comment.trim()) return;
      onSubmit(comment).then(() => setComment(''));
    };

    return (
      <Container isFocused={isFocused}>
        <CommentInput
          ref={ref}
          value={comment}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={`${writerName}님의 피드에 댓글을 남겨보세요!`}
          rows={1}
        />
        <SendButton type="submit" onClick={handleSubmit} disabled={disabled}>
          {isFocused ? <SendFillIcon /> : <SendIcon />}
        </SendButton>
      </Container>
    );
  }
);

export default FeedCommentInput;

const Container = styled('form', {
  background: '$gray800',
  flexType: 'verticalCenter',
  borderRadius: '10px',
  variants: {
    isFocused: {
      true: {
        outline: '1px solid $gray200',
      },
      false: {
        outline: 'none',
      },
    },
  },
});
const CommentInput = styled('textarea', {
  minWidth: 0,
  width: '100%',
  height: '48px',
  maxHeight: '120px',
  padding: '11px 16px',
  borderRadius: '10px',
  background: '$gray800',
  color: '$gray10',
  fontStyle: 'B2',
  border: 'none',
  outline: 'none',
  resize: 'none',
  '&::placeholder': {
    color: '$gray300',
  },
  '@tablet': {
    fontStyle: 'B3',
  },
});
const SendButton = styled('button', {
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
