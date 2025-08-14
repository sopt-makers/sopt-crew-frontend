import { useUserProfileQuery, useUserQuery } from '@api/user/hooks';
import { GetUser } from '@api/user/type';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import SearchMention from '@components/form/SearchMention';
import { fontsObject } from '@sopt-makers/fonts';
import { IconPlus, IconSearch, IconXCircle, IconXClose } from '@sopt-makers/icons';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'stitches.config';

interface CoLeaderFieldProps {
  value: mentionableDataType[];
  onChange: (coLeaders: mentionableDataType[]) => void;
  error: string | undefined;
}

interface mentionableDataType {
  id: number;
  display: string;
  orgId: number;
  userId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl?: string;
  userprofileImage?: string;
}

const CoLeader = ({ value: coLeaders = [], onChange, error }: CoLeaderFieldProps) => {
  const { data: me } = useUserProfileQuery();
  const { data: mentionUserList } = useUserQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredMeList =
    mentionUserList
      ?.filter((mentionUser: GetUser[number]) => mentionUser.userId !== me?.id)
      .map((mentionUser: GetUser[number]) => ({
        ...mentionUser,
        id: mentionUser.orgId,
        display: mentionUser.userName,
      })) ?? [];

  const handleUserSelect = (user: mentionableDataType) => {
    if (coLeaders.length < 3 && !coLeaders.some(leader => leader.id === user.id)) {
      onChange([...coLeaders, user]); // 선택한 유저 객체 추가
    }
    setComment('');
    setShowInput(false);
  };

  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 414);
    };
    window.addEventListener('resize', handleResize);

    const handleClickOutSide = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setShowInput(false);
    };

    handleResize(); // Initial check
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const handleBackdropClick = () => {
    setShowInput(false);
  };

  const handleDeleteLeader = (index: number) => {
    const updatedLeaders = coLeaders.filter((_, i) => i !== index);
    onChange(updatedLeaders);
  };

  return (
    <Container ref={containerRef}>
      <LeadersContainer>
        {/*추가 버튼과 멘션 인풋 */}
        {coLeaders.length < 3 && (
          <AddLeader>
            <AddButton
              type={'button'}
              onClick={() => {
                setShowInput(prev => !prev);
                setComment('');
              }}
              isActive={showInput}
            >
              <StyledIconPlus />
            </AddButton>
            {showInput && (
              <>
                {isMobile ? (
                  <Backdrop onClick={handleBackdropClick}>
                    <CommentInput onClick={e => e.stopPropagation()}>
                      <InputBox isActive={comment !== ''}>
                        <SearchMention
                          mentionUserList={filteredMeList}
                          inputRef={inputRef}
                          value={comment}
                          setValue={setComment}
                          placeholder={`멤버 검색`}
                          setIsFocused={setIsFocused}
                          setUserId={setUserId}
                          onUserSelect={handleUserSelect}
                        />
                        {comment ? (
                          <StyledIconXCircle
                            onClick={() => {
                              setComment('');
                            }}
                          />
                        ) : (
                          <StyledIconSearch />
                        )}
                      </InputBox>
                    </CommentInput>
                  </Backdrop>
                ) : (
                  <CommentInput onClick={e => e.stopPropagation()}>
                    <InputBox isActive={comment !== ''}>
                      <SearchMention
                        mentionUserList={filteredMeList}
                        inputRef={inputRef}
                        value={comment}
                        setValue={setComment}
                        placeholder={`멤버 검색`}
                        setIsFocused={setIsFocused}
                        setUserId={setUserId}
                        onUserSelect={handleUserSelect}
                      />
                      {comment ? (
                        <StyledIconXCircle
                          onClick={() => {
                            setComment('');
                          }}
                        />
                      ) : (
                        <StyledIconSearch />
                      )}
                    </InputBox>
                  </CommentInput>
                )}
              </>
            )}
          </AddLeader>
        )}

        {/*추가된 공동 모임장 프로필 렌더링 */}
        <LeadersWrapper>
          {coLeaders?.map((leader, idx) => (
            <Leader key={leader?.userId}>
              <SProfile>
                {leader?.profileImageUrl ? (
                  <img src={leader.profileImageUrl} alt={leader.userName} />
                ) : leader?.userprofileImage ? (
                  <img src={leader?.userprofileImage} alt={leader.userName} />
                ) : (
                  <StyledProfileDefaultIcon />
                )}
              </SProfile>
              <LeaderName>{leader.userName}</LeaderName>
              <DeleteButton type={'button'} onClick={() => handleDeleteLeader(idx)}>
                <StyledIconXClose />
              </DeleteButton>
            </Leader>
          ))}
        </LeadersWrapper>
      </LeadersContainer>

      {/*추후 사용할수도 있어 만들어 둔 에러 메세지 */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default CoLeader;

const Container = styled('div', {
  //디자인적인 건 x (에러메세지도 담아두기 위한 Container)
});

const Backdrop = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 10,
});

const LeadersContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  '@media (max-width: 414px)': {
    gap: '10px',
  },
});

const LeadersWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 414px)': {
    gap: '8px',
  },
});

const Leader = styled('div', {
  width: '134px',
  heigth: '48px',

  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',

  borderRadius: '10px',
  backgroundColor: '$gray900',
  flexWrap: 'nowrap',

  color: '$white',
  position: 'relative',

  '@media (max-width: 414px)': {
    width: '89px',
    height: '30px',
    padding: '5px 8px',
    gap: '6px',
    borderRadius: '6.25px',
  },
});

const LeaderName = styled('span', {
  color: '$white',
  ...fontsObject.BODY_2_16_M,
  whiteSpace: 'nowrap',

  '@media (max-width: 414px)': {
    ...fontsObject.LABEL_5_11_SB,
  },
});

const DeleteButton = styled('button', {
  display: 'flex',
  width: '16px',
  height: '16px',
  padding: '2px',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50px',
  background: '$gray700',
  cursor: 'pointer',
  '@media (max-width: 414px)': {
    width: '12px',
    height: '12px',
  },
});

const AddLeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
});

const CommentInput = styled('div', {
  position: 'absolute',
  top: '44px', //32 + 12
  display: 'inline-flex',
  padding: '8px',
  alignItems: 'flex-start',
  borderRadius: '13px',
  border: '1px solid $gray700',
  background: '$gray900',
  width: '170px',
  height: '64px',

  '@media (max-width: 414px)': {
    position: 'fixed',
    //부모 요소 : transform, perspective, 또는 position: fixed 등의 속성
    //자식 요소의 fixed 위치가 의도대로 표시되지 않음 -> 따라서 top 속성을 unset으로 제거해줘야 함
    top: 'unset',
    bottom: '0',
    left: '0',
    right: '0',

    width: '100%', // 좌우 16px 간격
    height: '66px', //18 + 48
    paddingTop: '10px',
    paddingBottom: '8px',
    bg: 'rgba(0, 0, 0, 0.7)',
    border: 'none',
    br: '0',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

const InputBox = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: '11px 16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: '$gray800',
  variants: {
    isActive: {
      true: {
        border: '1px solid $gray200',
      },
      false: {
        border: '1px solid transparent',
      },
    },
  },
  '@media (max-width: 414px)': {
    width: '328px',
    height: '48px',
  },
});

const AddButton = styled('button', {
  type: 'button',
  backgroundColor: '$gray700',
  borderRadius: '100px',
  cursor: 'pointer',
  display: 'flex',
  width: '32px',
  height: '32px',
  padding: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '$gray500',
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: '$gray500',
      },
    },
  },
  '@media (max-width: 414px)': {
    width: '24px',
    height: '24px',
    padding: '3.75px',
    br: '75px',
  },
});

const ErrorMessage = styled('div', {
  color: '$red500',
  fontSize: '12px',
  marginTop: '8px',
});

const SProfile = styled('a', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  img: {
    width: '$32',
    height: '$32',
    borderRadius: '50%',
    objectFit: 'cover',
    background: '$gray700',
    '@media (max-width: 768px)': {
      width: '$32',
      height: '$32',
    },
    '@media (max-width: 414px)': {
      width: '$20',
      height: '$20',
    },
  },
});

const StyledIconXCircle = styled(IconXCircle, {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
});

const StyledIconSearch = styled(IconSearch, {
  width: '24px',
  height: '24px',
  //모바일에선 input에 다른 뷰 필요 (현재는 구현 x)
});

const StyledIconPlus = styled(IconPlus, {
  width: '22px',
  height: '22px',
  color: 'white',
  cursor: 'pointer',
  '@media (max-width: 414px)': {
    width: '16.5px',
    height: '16.5px',
  },
});

const StyledIconXClose = styled(IconXClose, {
  width: '12px',
  height: '12px',
  '@media (max-width: 414px)': {
    width: '8px',
    height: '8px',
  },
  color: '#9D9DA4',
  strokeWidth: '1.5',
});

const StyledProfileDefaultIcon = styled(ProfileDefaultIcon, {
  width: '32px',
  height: '32px',
  '@media (max-width: 414px)': {
    width: '20px',
    height: '20px',
  },
});
