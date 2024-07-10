import { useQueryGetMentionUsers } from '@api/user/hooks';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { keyframes, styled } from '@stitches/react';
import React, { useCallback } from 'react';
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions';
import DefaultProfile from 'public/assets/svg/mention_profile_default.svg';

interface mentionableDataType {
  id: number;
  display: string;
  userId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
}

interface CommonMentionProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setUserIds: React.Dispatch<React.SetStateAction<number[] | null>>;
}

const CommonMention = ({ inputRef, value, setValue, placeholder, setIsFocused, setUserIds }: CommonMentionProps) => {
  const { data: mentionUserList } = useQueryGetMentionUsers();

  const extractNumbers = (inputString: string) => {
    const regex = /-~!@#@[^[\]]+\[(\d+)\]%\^&\*\+/g;
    const numbers: number[] | null = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
      numbers.push(Number(match[1]));
    }
    setUserIds(numbers);
  };

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

  const customSuggestionsContainer = (children: React.ReactNode) => {
    return <ScustomSuggestionsContainer>{children}</ScustomSuggestionsContainer>;
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
  return (
    <MentionsInput
      inputRef={inputRef}
      value={value}
      onChange={(e, newValue) => {
        extractNumbers(newValue);
        if (!inputRef.current) {
          setValue(e.target.value);
          return;
        }
        if (e.target.value.length === 0) {
          inputRef.current.style.height = 'auto';
        } else {
          inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
        setValue(e.target.value);
      }}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      customSuggestionsContainer={customSuggestionsContainer}
      style={defaultMentionStyle}
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
  );
};

export default CommonMention;

const defaultMentionStyle = {
  '&multiLine': {
    control: {
      fontWeight: 'normal',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },
    input: {
      color: colors.gray50,
      border: 'none',
      padding: '0',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: '100%',
      possition: 'relative',
      fontWeight: 'normal',
      maxHeight: '120px',
      overscrollBehavior: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    highlighter: {
      color: colors.success,
      innerHeight: '0',
      border: 'none',
      padding: '0',
      overflow: 'auto',
      boxSizing: 'border-box',
      maxHeight: '120px',
      pointerEvents: 'none',
      width: '100%',
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
};

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
