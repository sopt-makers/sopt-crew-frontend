import { styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import React, { forwardRef, useRef, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
}

const mentionableData = [
  { id: '1', display: '김나' },
  { id: '2', display: '김나나니니니' },
  { id: '3', display: '이가가' },
  { id: '4', display: '김가가' },
];

const renderSuggestion = (entry, search, highlightedDisplay, index, focused) => {
  return (
    <div
      key={entry.id}
      style={{
        backgroundColor: focused ? '#e0e0e0' : 'white',
        padding: '5px 10px',
        cursor: 'pointer',
        color: 'black',
      }}
    >
      {highlightedDisplay}
    </div>
  );
};

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled }, ref) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!comment.trim()) return;
      onSubmit(comment).then(() => {
        setComment('');
        setIsFocused(false);
      });
    };

    return (
      <Container isFocused={isFocused}>
        <CommentInput>
          {/*  */}
          <MentionsInput
            inputRef={inputRef}
            value={comment}
            onChange={(e, newValue, newPlain, mentions) => {
              if (!inputRef.current) {
                setComment(e.target.value);
                return;
              }
              if (e.target.value.length === 0) {
                inputRef.current.style.height = 'auto';
              } else {
                inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
              }
              setComment(e.target.value);
            }}
            placeholder={`${writerName}님의 피드에 댓글을 남겨보세요!`}
            onFocus={() => setIsFocused(true)}
            style={{
              '&multiLine': {
                input: {
                  ...fontsObject.BODY_2_16_R,
                  color: colors.gray50,
                  border: 'none',
                  padding: '0',
                  overflow: 'auto',
                  maxHeight: '120px',
                },
                highlighter: {
                  ...fontsObject.BODY_2_16_R,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  maxHeight: '120px',
                },
              },
            }}
          >
            <Mention
              trigger="@"
              displayTransform={(_, display) => `@${display}`}
              data={mentionableData}
              renderSuggestion={renderSuggestion}
            />
          </MentionsInput>
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
        outline: '1px solid $gray200',
      },
      false: {
        outline: 'none',
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
  '&::placeholder': {
    color: '$gray300',
  },
});
const SendButton = styled('button', {
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
