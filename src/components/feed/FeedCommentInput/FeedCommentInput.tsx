import { styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import React, { useState } from 'react';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import { ampli } from '@/ampli';
import { useDisplay } from '@hooks/useDisplay';
import { useQueryMyProfile } from '@api/user/hooks';

interface FeedCommentInputProps {
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
}

export default function FeedCommentInput({ onSubmit, disabled }: FeedCommentInputProps) {
  const { query } = useRouter();
  const { isMobile } = useDisplay();
  const [comment, setComment] = useState('');
  const { data: meeting } = useQueryGetMeeting({ params: { id: String(query.id) } });
  const { data: me } = useQueryMyProfile();

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
    ampli.completedCommentPosting({
      crew_status: meeting?.approved,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: Number(me?.orgId),
    });
    onSubmit(comment).then(() => setComment(''));
  };

  return (
    <Container>
      <CommentInput value={comment} onChange={handleChange} placeholder="댓글 입력" rows={1} />
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
const CommentInput = styled('textarea', {
  minWidth: 0,
  width: '692px',
  height: '54px',
  maxHeight: '120px',
  padding: '14px 24px',
  borderRadius: '25px',
  background: '$black60',
  color: '$white100',
  fontStyle: 'B2',
  border: 'none',
  outline: 'none',
  resize: 'none',
  '&::placeholder': {
    color: '$gray60',
  },
  '@tablet': {
    height: '48px',
    padding: '12px 24px',
    fontStyle: 'B3',
  },
});
const SendButton = styled('button', {
  width: '32px',
  height: '32px',
});
