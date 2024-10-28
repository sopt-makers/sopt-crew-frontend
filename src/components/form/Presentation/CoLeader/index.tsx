import { styled } from 'stitches.config';
import React, { useRef, useState } from 'react';
import { IconPlus } from '@sopt-makers/icons';
import CommonMention from '@components/feed/Mention';
import SearchMention from '@components/form/SearchMention';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { IconSearch } from '@sopt-makers/icons';
import { IconXCircle } from '@sopt-makers/icons';
import { SearchField } from '@sopt-makers/ui';
import { useQueryGetMentionUsers } from '@api/user/hooks';

interface CoLeaderFieldProps {
  value: mentionableDataType[];
  onChange: (coLeaders: mentionableDataType[]) => void;
  error: string | undefined;
}

interface mentionableDataType {
  id: number;
  display: string;
  orgId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
}

const CoLeader = ({ value: coLeaders = [], onChange, error }: CoLeaderFieldProps) => {
  console.log('coLeaders:', coLeaders);
  const { data: mentionUserList } = useQueryGetMentionUsers();

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

  const handleAddLeader = () => {
    // 리더 추가 기능 비활성화
  };

  const handleDeleteLeader = (index: number) => {
    const updatedLeaders = coLeaders.filter((_, i) => i !== index);
    onChange(updatedLeaders);
  };

  return (
    <Container>
      <LeadersContainer>
        {coLeaders.map((leader, idx) => (
          <Leader key={leader.id}>
            <SProfile>
              {leader.profileImageUrl ? (
                <img src={leader.profileImageUrl} alt={leader.userName} />
              ) : (
                <ProfileDefaultIcon />
              )}
              <span>{leader.userName}</span>
            </SProfile>

            <DeleteButton type={'button'} onClick={() => handleDeleteLeader(idx)}>
              ×
            </DeleteButton>
          </Leader>
        ))}
        {coLeaders.length < 3 && (
          <AddLeader>
            <AddButton
              type={'button'}
              onClick={() => {
                setShowInput(true);
                setComment('');
              }}
            >
              <IconPlus style={{ width: '22px', height: '22px', color: 'white', cursor: 'pointer' }} />
            </AddButton>
            {showInput && (
              <CommentInput>
                <InputBox isActive={comment !== ''}>
                  <SearchMention
                    mentionUserList={mentionUserList}
                    inputRef={inputRef}
                    value={comment}
                    setValue={setComment}
                    placeholder={`Search...`}
                    setIsFocused={setIsFocused}
                    setUserId={setUserId}
                    onUserSelect={handleUserSelect}
                  />
                  {comment ? (
                    <IconXCircle
                      style={{ width: '24px', height: '24px' }}
                      onClick={() => {
                        setComment('');
                      }}
                    />
                  ) : (
                    <IconSearch style={{ width: '24px', height: '24px' }} />
                  )}
                </InputBox>
              </CommentInput>
            )}
          </AddLeader>
        )}
      </LeadersContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default CoLeader;

const Container = styled('div', {
  border: '1px solid $gray700',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '$gray800',
});

const LeadersContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const Leader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '$gray600',
  borderRadius: '4px',
  padding: '4px 8px',
  color: '$white',
  position: 'relative',
});

const LeaderAvatar = styled('span', {
  fontSize: '20px',
  marginRight: '6px',
});

const LeaderName = styled('span', {
  fontSize: '14px',
  color: '$white',
});

const DeleteButton = styled('button', {
  background: 'none',
  border: 'none',
  color: '$red500',
  fontSize: '14px',
  cursor: 'pointer',
  position: 'absolute',
  top: '0',
  right: '0',
  padding: '2px 4px',
});

const AddLeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
});

const CommentInput = styled('div', {
  position: 'absolute',
  top: '40px',
  display: 'inline-flex',
  padding: '8px',
  alignItems: 'flex-start',
  borderRadius: '13px',
  border: '1px solid $gray700',
  background: '$gray900',
  width: '170px',
  height: '64px',
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
    width: '$60',
    height: '$60',
    borderRadius: '50%',
    objectFit: 'cover',
    mr: '$16',
    background: '$gray700',
    '@tablet': {
      width: '$32',
      height: '$32',
      mr: '$8',
    },
  },
});
