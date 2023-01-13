import { Box } from '@components/box/Box';
import Select from '@components/Form/Select';
import Textarea from '@components/Form/Textarea';
import TextInput from '@components/Form/TextInput';
import DefaultModal from '@components/modal/DefaultModal';
import useDebounce from '@hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useUsersToInvite } from 'src/api/meeting/hooks';
import { generationOptions } from 'src/data/options';
import { styled } from 'stitches.config';
import InvitationListItem from './InvitationListItem';

interface InvitationModalProps {
  isModalOpened: boolean;
  title: string;
  handleModalClose: () => void;
}

const InvitationModal = ({
  isModalOpened,
  title,
  handleModalClose,
}: InvitationModalProps) => {
  const router = useRouter();
  const groupId = router.query.id as string;
  const [textareaValue, setTextareaValue] = useState('');

  const [generation, setGeneration] = useState(generationOptions[0]);
  const [name, setName] = useState('');
  const debouncedName = useDebounce<string>(name, 300);

  const { data: users, isLoading } = useUsersToInvite({
    groupId,
    generation: generation.value,
    name: debouncedName,
  });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
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

  const handleInvitationButton = () => {
    console.log('초대하기 버튼 클릭');
  };

  return (
    <DefaultModal
      isModalOpened={isModalOpened}
      title={title}
      handleModalClose={handleModalClose}
    >
      <SInvitationModal>
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
        <SMemberTitleContainer>
          <STitle>회원 목록 ({users?.length})</STitle>
          <div>
            <ShowSelectedOnlyButton
              active={showSelectedOnly}
              onClick={() => setShowSelectedOnly(prev => !prev)}
            >
              선택 회원 보기 ({selectedUsers.length})
            </ShowSelectedOnlyButton>
            <SAllButton onClick={handleSelectAll} active={isAllSelected}>
              전체 {isAllSelected ? '해제' : '선택'}
            </SAllButton>
          </div>
        </SMemberTitleContainer>
        <SMemberList>
          {isLoading && <EmptyList>로딩중...</EmptyList>}
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
        {/* <STitle>초대 메시지</STitle>
        <SInvitationForm>
          <Textarea
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextareaValue(e.target.value)
            }
            placeholder="(선택) 초대와 함께 보낼 메시지를 입력해주세요!"
            maxLength={300}
            error={
              textareaValue.length >= 300
                ? '300자 까지 입력할 수 있습니다.'
                : ''
            }
          />
        </SInvitationForm> */}
        <SInvitationButton onClick={handleInvitationButton}>
          초대하기
        </SInvitationButton>
      </SInvitationModal>
    </DefaultModal>
  );
};

export default InvitationModal;

const SInvitationModal = styled(Box, {
  padding: '$40',
  color: '$white',
});

const SFilterContainer = styled(Box, {
  display: 'flex',
  alignItems: 'center',
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

const ShowSelectedOnlyButton = styled('button', {
  variants: {
    active: {
      true: {
        color: '$purple100 !important',
      },
    },
  },
});

const SInvitationForm = styled(Box, {
  mb: '$4',

  textarea: {
    fontAg: '16_medium_150',
    fontFamily: 'SUIT',
    borderRadius: '15px',
    padding: '$16 $20',

    '&::-webkit-scrollbar': {
      width: '$6',
    },

    '&::-webkit-scrollbar-thumb': {
      height: '$70',
      backgroundColor: '$gray100',
      borderRadius: '6px',
    },
  },

  'textarea:focus': {
    boxShadow: '0 0 0 1px #8040ff',
  },
});

const SInvitationButton = styled('button', {
  display: 'block',
  margin: '0 auto',
  padding: '$20 0',
  width: '$175',
  borderRadius: '14px',
  color: '$white',
  fontAg: '20_bold_100',
  textAlign: 'center',
  background: '$purple100',
});
