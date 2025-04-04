import { PostCommentWithMentionRequest } from '@api/mention';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import React, { forwardRef, useContext, useRef, useState } from 'react';
import { styled } from 'stitches.config';
import CommonMention from '../Mention';
import { MentionContext } from '../Mention/MentionContext';
export interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (req: PostCommentWithMentionRequest) => Promise<void>;
  disabled?: boolean;
  commentId?: number;
}

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled }) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [userIds, setUserIds] = useState<number[] | null>(null);

    // 현재 URL에서 쿼리 파라미터를 가져오기
    const urlParams = new URLSearchParams(window.location.search);

    // 'id' 파라미터 값 가져오기: api리퀘스트에서 보내야하는 postId값
    const postId = Number(urlParams.get('id'));

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const { setIsReCommentClicked, setParentComment } = useContext(MentionContext);

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
      <Container isFocused={isFocused}>
        <CommentInput>
          <CommonMention
            inputRef={inputRef}
            value={comment}
            setValue={setComment}
            placeholder={`${writerName}님의 피드에 댓글을 남겨보세요!`}
            setIsFocused={setIsFocused}
            setUserIds={setUserIds}
            isComment={true}
            onClick={() => {
              setIsReCommentClicked(false);
              setParentComment(prev => ({ ...prev, parentComment: true }));
            }}
          />
        </CommentInput>

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

  '@media (max-width: 768px)': {
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
