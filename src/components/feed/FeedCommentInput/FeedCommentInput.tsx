import { keyframes, styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import React, { forwardRef, useRef, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { colors } from '@sopt-makers/colors';
import DefaultProfile from '../../../../public/assets/svg/mention_profile_default.svg';
import { fontsObject } from '@sopt-makers/fonts';

interface UserListProps {
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    page: number;
    pageCount: number;
    take: number;
  };
  users: {
    generation: number;
    part: string;
    profileImageUrl: string;
    userId: number;
    userName: string;
  }[];
}

interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
  data: UserListProps;
}

const mentionableData = [
  { id: '1', value: '1', label: '김나', display: '김나', description: '33기 IOS', imageURL: '' },
  {
    id: '2',
    value: '2',
    label: '김나',
    display: '김나',
    description: '33기 안드로이드',
    imageURL: '',
  },
  { id: '3', value: '3', label: '이가가', display: '이가가', description: '33기 웹', imageURL: '' },
  { id: '4', value: '4', label: '김가가', display: '김가가', description: '33기 서버', imageURL: '' },
  { id: '5', value: '1', label: '김나', display: '김나', description: '33기 IOS', imageURL: '' },
  {
    id: '6',
    value: '2',
    label: '김나가',
    display: '김가나',
    description: '33기 안드로이드',
    imageURL: '',
  },
  { id: '7', value: '3', label: '이가가', display: '이가가', description: '33기 웹', imageURL: '' },
  { id: '8', value: '4', label: '김가가', display: '김가가', description: '33기 서버', imageURL: '' },
];

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled, data }) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const renderSuggestion = (suggestion, search, highlightedDisplay, index, focused) => {
      return (
        <>
          {suggestion.imageURL ? (
            <></>
          ) : (
            <SrenderSuggestion key={suggestion.id}>
              <DefaultProfile />
              <div>
                <div>{suggestion.display}</div> <p>{suggestion.description}</p>
              </div>
            </SrenderSuggestion>
          )}
        </>
      );
    };

    const customSuggestionsContainer = children => {
      return <ScustomSuggestionsContainer>{children}</ScustomSuggestionsContainer>;
    };

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
            customSuggestionsContainer={customSuggestionsContainer}
            style={{
              control: {},
              '&multiLine': {
                input: {
                  color: colors.gray50,
                  border: 'none',
                  padding: '0',

                  overflow: 'auto',
                  maxHeight: '120px',
                  overscrollBehavior: 'none',
                },
                highlighter: {
                  color: colors.success,
                  border: 'none',
                  padding: '0',

                  overflow: 'auto',
                  boxSizing: 'border-box',

                  maxHeight: '120px',

                  pointerEvents: 'none',

                  position: 'relative',
                  zIndex: '1',
                },
              },
              suggestions: {
                backgroundColor: 'transparent',
                item: {
                  borderRadius: '8px',
                  '&focused': {
                    background: colors.gray800,
                  },
                },
              },
            }}
          >
            <Mention
              trigger="@"
              displayTransform={(_, display) => `@${display}`}
              data={mentionableData}
              markup="-~!@#@__display__[__id__]%^&*+"
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
  '&': {
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

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0)' },
  '100%': { opacity: 1, transform: 'translateY(10px)' },
});

const ScustomSuggestionsContainer = styled('div', {
  borderRadius: '13px',
  boxSizing: 'border-box',
  width: 'max-content',
  padding: '8px',
  background: '#17181c',
  border: `1px solid ${colors.gray700}`,

  animation: `${fadeIn} 0.5s forwards`,

  maxHeight: '418px',
  overflow: 'scroll',
});

const SrenderSuggestion = styled('button', {
  boxSizing: 'border-box',
  padding: '8px 12px',
  gap: '12px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  marginBottom: '6px',
  ...fontsObject.BODY_2_16_M,
  color: colors.gray10,
  '& > div > p': {
    ...fontsObject.BODY_4_13_R,
    color: colors.gray100,
  },
});
