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
  userId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
}

const defaultMentionableDataType = {
  id: 0,
  display: '',
  orgId: 0,
  userId: 0,
  userName: '',
  recentPart: '',
  recentGeneration: 0,
  profileImageUrl: '',
};

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
  //전역 상태 - 혹시 필요하면 context 적절히 조작하여 사용
  const { user } = useContext(SearchMentionContext);

  const handleUserClick = (user: mentionableDataType) => {
    onUserSelect(user);
    setValue('');
  };

  const filterUsersBySearchTerm = (searchTerm: string, users: mentionableDataType[]) => {
    return users?.filter((v: mentionableDataType) => v.userName.includes(searchTerm));
  };

  const getRandomUsers = (users: mentionableDataType[]) => {
    if (!users) return [];
    const shuffled = users.sort(() => 0.5 - Math.random());
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

  //인물 하나 하나의 모습
  const renderSuggestion = useCallback((suggestion: SuggestionDataItem) => {
    return (
      <>
        <SRenderSuggestion
          key={suggestion.id}
          onClick={() => {
            handleUserClick(suggestion as mentionableDataType);
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            //엔터 누르면 간편히 설정되도록 하고 싶은데,
            //위에 react-mention의 li(aria-selected 속성 사용)를 조작해야할 것 같아서.. 아직은 구현 못함
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
        setUserId(user.userId); //필요한 경우가 있을까봐 설정해둠
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
          // 엔터 키를 눌렀을 때 기본 동작(개행) 방지
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
        // onKeyDown={(e: React.KeyboardEvent) => {
        //   if (e.key === 'Enter') {
        //     // 엔터 키를 눌렀을 때 기본 동작(개행) 방지
        //     console.log('hiss');
        //     e.preventDefault();
        //   }
        // }}
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
      //요 부분이 textArea!
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
      height: '30px',
      maxHeight: '208px',
      overscrollBehavior: 'none',
      fontFamily: 'inherit',
      fontWeight: 'normal',
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    highlighter: {
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

// 위로 올라가는 애니메이션
const fadeInUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0px)' },
  '100%': { opacity: 1, transform: 'translateY(-10px)' },
});

const SCustomSuggestionsContainer = styled('div', {
  borderRadius: '13px',
  boxSizing: 'border-box',
  width: '170px',
  height: '230px',
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

  '@media (max-width: 768px)': {
    position: 'absolute',
    left: '0',
    bottom: '120px',
    width: '170px',
    maxHeight: '418px',
    height: '230px',
    border: 'none',
    borderRadius: '20px',
  },

  //@mobile alias 사용 불가 (react-mention 에서 렌더링하기 때문)
  '@media (max-width: 430px)': {
    position: 'fixed',
    top: 'unset', //부모 요소 - transform, perspective, fixed 일 경우 필요
    bottom: '66px', //8 + 48 + 10
    left: '0',
    right: '0',
    width: '328px',
    maxHeight: '210px',
    margin: '0 auto',

    animation: `${fadeInUp} 0.5s forwards`,
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
  '@media (max-width: 768px)': {
    padding: '16px 12px',
  },
});
