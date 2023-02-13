import { Box } from '@components/box/Box';
import Select from '@components/form/Select';
import TextInput from '@components/form/TextInput';
import useDebounce from '@hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { SetStateAction, useMemo, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { useUsersToInvite } from 'src/api/meeting/hooks';
import { generationOptions } from 'src/data/options';
import { styled } from 'stitches.config';
import InvitationListItem from '../InvitationListItem';

interface SelectUsersStepProps {
  selectedUsers: number[];
  setSelectedUsers: React.Dispatch<SetStateAction<number[]>>;
}

// eslint-disable-next-line prettier/prettier
export default function SelectUsersStep({ selectedUsers, setSelectedUsers }: SelectUsersStepProps) {
  const router = useRouter();
  const groupId = router.query.id as string;

  const [generation, setGeneration] = useState(generationOptions[0]);
  const [name, setName] = useState('');
  const debouncedName = useDebounce<string>(name, 300);

  const { data: users, isLoading } = useUsersToInvite({
    groupId,
    generation: generation.value,
    name: debouncedName,
  });

  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const isAllSelected = useMemo(
    () => !!users?.length && selectedUsers.length === users?.length,
    [selectedUsers, users]
  );

  const handleSelect = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    } else {
      setSelectedUsers(prev => [...prev, userId]);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users?.map(user => user.id) ?? []);
    }
  };

  return (
    <>
      <SFilterContainer>
        <Select
          options={generationOptions}
          value={generation}
          onChange={setGeneration}
        />
        <TextInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="회원 검색"
        />
      </SFilterContainer>
      {users?.length && (
        <SMemberTitleContainer>
          <STitle>회원 목록 ({users?.length})</STitle>
          <ControlButtonContainer>
            <ShowSelectedOnlyButton
              active={showSelectedOnly}
              onClick={() => setShowSelectedOnly(prev => !prev)}
            >
              선택 회원 보기 ({selectedUsers.length})
            </ShowSelectedOnlyButton>
            <SAllButton onClick={handleSelectAll} active={isAllSelected}>
              전체 {isAllSelected ? '해제' : '선택'}
            </SAllButton>
          </ControlButtonContainer>
        </SMemberTitleContainer>
      )}
      <SMemberList>
        {isLoading && (
          <SLoaderWrapper>
            <SyncLoader color="#8040ff" />
          </SLoaderWrapper>
        )}
        {!isLoading && !users?.length ? (
          <EmptyList>회원이 없습니다.</EmptyList>
        ) : (
          users
            ?.filter(user =>
              showSelectedOnly ? selectedUsers.includes(user.id) : true
            )
            .map(user => (
              <InvitationListItem
                key={user.id}
                member={user}
                checked={selectedUsers.includes(user.id)}
                onSelect={handleSelect}
              />
            ))
        )}
      </SMemberList>
    </>
  );
}

const SFilterContainer = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  button: {
    height: '$54',
  },
});

const SMemberTitleContainer = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$40',
  mb: '$20',

  '@mobile': {
    mt: '$36',
    mb: '$28',
  },

  button: {
    fontAg: '16_medium_100',
    color: '$gray60',

    '@mobile': {
      fontAg: '12_semibold_100',
    },
  },
});

const SAllButton = styled('button', {
  ml: '$20',
  variants: {
    active: {
      true: {
        color: '$purple100 !important',
      },
    },
  },
});

const SMemberList = styled(Box, {
  height: '320px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '$8',
  },
  '&::-webkit-scrollbar-thumb': {
    height: '$122',
    backgroundColor: '$gray100',
    borderRadius: '6px',
  },
});

const SLoaderWrapper = styled(Box, {
  flexType: 'center',
  height: '100%',
});

const EmptyList = styled(Box, {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontAg: '16_medium_100',
  color: '$gray80',
});

const STitle = styled(Box, {
  fontAg: '20_bold_100',

  '@mobile': {
    fontAg: '16_bold_100',
  },
});

const ControlButtonContainer = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});

const ShowSelectedOnlyButton = styled('button', {
  variants: {
    active: {
      true: {
        color: '$purple100 !important',
      },
    },
  },
});
