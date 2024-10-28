import { useQueryGetMentionUsers } from '@api/user/hooks';
import { parseMentionedUserIds } from '@components/util/parseMentionedUserIds';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { keyframes, styled } from '@stitches/react';
import DefaultProfile from 'public/assets/svg/mention_profile_default.svg';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import { SearchMentionContext } from './SearchMentionContext';

interface mentionableDataType {
  id: number;
  display: string;
  orgId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
}

interface SearchMentionProps {
  mentionUserList: mentionableDataType[];
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  onClick?: () => void;
  onUserSelect: (user: mentionableDataType) => void;
}

const SearchMention = ({
  mentionUserList,
  inputRef,
  value,
  setValue,
  placeholder,
  setIsFocused,
  setUserId,
  onClick,
  onUserSelect,
}: SearchMentionProps) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
  //전역 상태(이걸로 user에게 필요한 정보 잘 모아서, api 요청 보내야할 듯) -> 근데 지금은 딱히 사용하고 있지 않음
  const { user, setUser } = useContext(SearchMentionContext);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // -1은 선택된 것이 없음을 나타냄

  const handleUserClick = (user: mentionableDataType) => {
    onUserSelect(user);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const suggestions = getFilteredAndRandomUsers(
        value,
        mentionUserList.map(v => ({ ...v, id: v.orgId, display: v.userName }))
      );

      if (suggestions.length > 0) {
        // If there are suggestions, select the first one
        handleUserClick(suggestions[0]);
        e.preventDefault(); // Prevent default behavior of Enter key (like submitting a form)
      }
    }
  };

  const filterUsersBySearchTerm = (searchTerm: string, users: mentionableDataType[]) => {
    return users?.filter((v: mentionableDataType) => v.userName.includes(searchTerm));
  };

  const getRandomUsers = (users: mentionableDataType[]) => {
    const shuffled = users?.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  const getFilteredAndRandomUsers = (searchTerm: string, users: mentionableDataType[]) => {
    const filteredUsers = filterUsersBySearchTerm(searchTerm, users);
    const randomUsers = getRandomUsers(filteredUsers);
    return randomUsers;
  };

  const customSuggestionsContainer = (children: React.ReactNode) => {
    return <SCustomSuggestionsContainer>{children}</SCustomSuggestionsContainer>;
  };

  //이게 인물 하나 하나의 모습
  const renderSuggestion = useCallback((suggestion: SuggestionDataItem) => {
    return (
      <>
        <SRenderSuggestion
          key={suggestion.id}
          onClick={() => handleUserClick(suggestion as mentionableDataType)}
          onKeyDown={(e: React.KeyboardEvent) => {
            //엔터 누르면 간편히 설정되도록 하고 싶은데, 위에 li(aria-selected 속성 사용)를 사용해야할 것 같아서..
            //아직은 구현 못함
            if (e.key === 'Enter') {
              handleUserClick(suggestion as mentionableDataType);
            }
          }}
        >
          {(suggestion as mentionableDataType).profileImageUrl ? (
            <SImageWrapper>
              <img src={(suggestion as mentionableDataType).profileImageUrl} alt="Img" />
            </SImageWrapper>
          ) : (
            <DefaultProfile />
          )}

          <div>
            <div>{suggestion.display}</div>
            <p>
              {(suggestion as mentionableDataType).recentGeneration}기{` `}
              {(suggestion as mentionableDataType).recentPart}
            </p>
          </div>
        </SRenderSuggestion>
      </>
    );
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <MentionsInput
      inputRef={inputRef}
      value={value}
      onChange={(e, newValue) => {
        setUserId(user.userId); //아마 api 요청 보낼 때 전역상태인 user.userId를 잘 활용해야 할 거임! -> 아닌가..?
        if (!inputRef.current) {
          setValue(newValue);
          return;
        }
        if (e.target.value.length === 0) {
          inputRef.current.style.height = 'auto';
        } else {
          inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
        setValue(newValue);
      }}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      customSuggestionsContainer={customSuggestionsContainer}
      style={FeedModalMentionStyle}
      forceSuggestionsAboveCursor={isMobile}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          // 엔터 키를 눌렀을 때 기본 동작 방지
          e.preventDefault();
        }
      }}
    >
      <Mention
        trigger=""
        displayTransform={(_, display) => display}
        data={search => {
          if (search.length < 1) return [];
          const data = getFilteredAndRandomUsers(
            search,
            mentionUserList?.map((v: mentionableDataType) => ({ ...v, id: v.orgId, display: v.userName }))
          );
          return data;
        }}
        renderSuggestion={renderSuggestion}
      />
    </MentionsInput>
  );
};

export default SearchMention;

const SImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    width: '32px',
    height: '32px',
    borderRadius: '100%',
  },
});

const FeedModalMentionStyle = {
  width: '100%',
  height: '100%',
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
      innerHeight: '0',
      borderRadius: '10px',
      border: 'none',
      padding: '0',
      margin: '0',
      marginTop: '0',
      marginLeft: '0',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: '100%',
      maxHeight: '208px',
      overscrollBehavior: 'none',
      fontFamily: 'inherit',
      fontWeight: 'normal',
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    highlighter: {
      color: colors.success,
      innerHeight: '0',
      border: 'none',
      padding: '0',
      margin: '0',
      marginTop: '0',
      marginLeft: '0',
      overflow: 'auto',
      boxSizing: 'border-box',
      maxHeight: '208px',
      pointerEvents: 'none',
      width: '100%',
      zIndex: '1',
    },
  },
  suggestions: {
    backgroundColor: 'transparent',
    item: {
      minWidth: '154px',
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

const SCustomSuggestionsContainer = styled('div', {
  borderRadius: '13px',
  boxSizing: 'border-box',
  width: '170px',
  padding: '8px',
  background: '#17181c',
  position: 'absolute',
  top: '18px',
  left: '-24px',
  border: `1px solid ${colors.gray700}`,

  animation: `${fadeIn} 0.5s forwards`,

  maxHeight: '230px',

  overflowY: 'scroll',
  overflowX: 'hidden',

  // 스크롤 스타일
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colors.gray600,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },

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

const SRenderSuggestion = styled('button', {
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