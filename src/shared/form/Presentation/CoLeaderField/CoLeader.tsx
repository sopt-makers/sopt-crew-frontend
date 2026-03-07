import { useUserProfileQueryOption, useUserQueryOption } from '@api/user/query';
import { GetUser } from '@api/user/type';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import SearchMention from '@shared/form/SearchMention';
import { fontsObject } from '@sopt-makers/fonts';
import { IconSearch, IconXCircle, IconXClose } from '@sopt-makers/icons';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
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
  const { data: me } = useQuery(useUserProfileQueryOption());
  const { data: mentionUserList } = useQuery(useUserQueryOption());
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
  };

  const [comment, setComment] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDeleteLeader = (index: number) => {
    const updatedLeaders = coLeaders.filter((_, i) => i !== index);
    onChange(updatedLeaders);
  };

  return (
    <Container ref={containerRef}>
      <LeadersContainer>
        {/*추가 버튼과 멘션 인풋 */}
        {coLeaders.length < 3 && (
          <InputBox isActive={comment !== ''}>
            <SearchMention
              mentionUserList={filteredMeList}
              inputRef={inputRef}
              value={comment}
              setValue={setComment}
              placeholder={`멤버 검색`}
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

const LeadersContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const LeadersWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 430px)': {
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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

  '@media (max-width: 430px)': {
    width: '113px',
    height: '40px',
    padding: '8px 10px',
    gap: '8px',
  },
});

const LeaderName = styled('span', {
  color: '$white',
  ...fontsObject.BODY_2_16_M,
  whiteSpace: 'nowrap',

  '@media (max-width: 430px)': {
    ...fontsObject.BODY_3_14_M,
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
});

const InputBox = styled('div', {
  // width: '100%',
  flexShrink: 0,
  width: '160px',
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

    '@media (max-width: 430px)': {
      width: '$24',
      height: '$24',
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

const StyledIconXClose = styled(IconXClose, {
  width: '16px',
  height: '16px',
  color: '#9D9DA4',
  strokeWidth: '1.5',
  cursor: 'pointer',
});

const StyledProfileDefaultIcon = styled(ProfileDefaultIcon, {
  width: '32px',
  height: '32px',
  '@media (max-width: 430px)': {
    width: '24px',
    height: '24px',
  },
});
