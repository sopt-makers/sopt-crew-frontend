import { keyframes, styled } from 'stitches.config';
import SendIcon from 'public/assets/svg/send.svg';
import SendFillIcon from 'public/assets/svg/send_fill.svg';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions';
import { colors } from '@sopt-makers/colors';
import DefaultProfile from 'public/assets/svg/mention_profile_default.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { useQueryGetMentionUsers } from '@api/user/hooks';

interface FeedCommentInputProps {
  writerName: string;
  onSubmit: (comment: string) => Promise<void>;
  disabled?: boolean;
}

interface mentionableDataType {
  id: number;
  display: string;
  userId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
}

const FeedCommentInput = forwardRef<HTMLTextAreaElement, FeedCommentInputProps>(
  ({ writerName, onSubmit, disabled }) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const { data: mentionUserList } = useQueryGetMentionUsers();

    // 현재 URL에서 쿼리 파라미터를 가져오기
    const urlParams = new URLSearchParams(window.location.search);

    // 'id' 파라미터 값 가져오기: api리퀘스트에서 보내야하는 postId값
    const postId = urlParams.get('id');

    const filterUsersBySearchTerm = (searchTerm: string, users: mentionableDataType[]) => {
      return users.filter((v: mentionableDataType) => v.userName.includes(searchTerm));
    };

    const getRandomUsers = (users: mentionableDataType[]) => {
      const shuffled = users.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 30);
    };

    const getFilteredAndRandomUsers = (searchTerm: string, users: mentionableDataType[]) => {
      const filteredUsers = filterUsersBySearchTerm(searchTerm, users);
      const randomUsers = getRandomUsers(filteredUsers);
      return randomUsers;
    };

    const renderSuggestion = useCallback(
      (suggestion: SuggestionDataItem) => {
        return (
          <>
            {(suggestion as mentionableDataType).profileImageUrl ? (
              <></>
            ) : (
              <SrenderSuggestion key={suggestion.id}>
                <DefaultProfile />
                <div>
                  <div>{suggestion.display}</div>{' '}
                  <p>
                    {(suggestion as mentionableDataType).recentGeneration}기{` `}
                    {(suggestion as mentionableDataType).recentPart}
                  </p>
                </div>
              </SrenderSuggestion>
            )}
          </>
        );
      },
      [
        /*data*/
      ]
    );

    const customSuggestionsContainer = (children: React.ReactNode) => {
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

    const extractNumbers = (inputString: string) => {
      const regex = /-~!@#@[^\[\]]+\[(\d+)\]%\^&\*\+/g;
      const numbers = [];
      let match;

      while ((match = regex.exec(inputString)) !== null) {
        numbers.push(Number(match[1]));
      }

      // console.log(numbers);
      return numbers;
    };

    return (
      <Container isFocused={isFocused}>
        <CommentInput>
          <MentionsInput
            inputRef={inputRef}
            value={comment}
            onChange={(e, newValue, mentions) => {
              // 비밀 문자열이 포함된 input text 가 newValue 입니다.
              // mentionIds 배열에는 mentions 배열의 id 를 활용하면 좋을 것 같습니다.
              extractNumbers(newValue);
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
              data={search => {
                const data = getFilteredAndRandomUsers(
                  search,
                  mentionUserList?.map((v: mentionableDataType) => ({ ...v, id: v.userId, display: v.userName }))
                );
                return data;
              }}
              markup="-~!@#@__display__[__id__]%^&*+" // markup 의 display와 id 앞 뒤에 __ 가 있는 이유는, string 에서 js 변수를 찾아내기 위한 라이브러리 rule 입니다.
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

  '@tablet': {
    position: 'fixed',
    left: '0',
    bottom: '120px',
    width: '100%',
    maxHeight: '418px',
    height: '100%',
    border: 'none',
    borderRadius: '20px',
  },
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
  '@tablet': {
    padding: '16px 12px',
  },
});
