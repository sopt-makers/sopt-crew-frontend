import { styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import React, { useState } from 'react';

interface FeedCommentInputProps {
  onSubmit: (comment: string) => void;
  disabled?: boolean;
}

export default function FeedCommentInput({ onSubmit, disabled }: FeedCommentInputProps) {
  const [comment, setComment] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!comment.trim()) return;
    onSubmit(comment);
  };

  return (
    <Container>
      <CommentInput value={comment} onChange={handleChange} placeholder="댓글 입력" />
      <SendButton type="submit" onClick={handleSubmit} disabled={disabled}>
        <SendIcon />
      </SendButton>
    </Container>
  );
}

const Container = styled('form', {
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