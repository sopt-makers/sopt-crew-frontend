import { styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import React, { forwardRef, useState } from 'react';

interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
}

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled }, ref) => {
    const [comment, setComment] = useState('');

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
      <Container>
        <CommentInput
          ref={ref}
          value={comment}
          onChange={handleChange}
          placeholder={`${writerName}님의 피드에 댓글을 남겨보세요!`}
          rows={1}
        />
        <SendButton type="submit" onClick={handleSubmit} disabled={disabled}>
          <SendIcon />
        </SendButton>
      </Container>
    );
  }
);

export default FeedCommentInput;

const Container = styled('form', {
  flexType: 'verticalCenter',
  gap: '16px',
});
const CommentInput = styled('textarea', {
  minWidth: 0,
  width: '692px',
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
  '&:focus': {
    outline: '1px solid $gray200',
  },
  '@tablet': {
    fontStyle: 'B3',
  },
});
const SendButton = styled('button', {
  width: '32px',
  height: '32px',
});
