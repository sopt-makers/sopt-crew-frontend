import { styled } from 'stitches.config';
import React, { useState } from 'react';

interface CoLeaderFieldProps {
  value: string[];
  onChange: (coLeaders: string[]) => void;
  error: string | undefined;
}

const CoLeader = ({ value: coLeaders = [], onChange, error }: CoLeaderFieldProps) => {
  //const [coLeaders, setCoLeaders] = useState([]);
  const [newLeader, setNewLeader] = useState('');

  const handleAddLeader = () => {
    if (newLeader && coLeaders.length < 3) {
      onChange([...coLeaders, newLeader]);
      setNewLeader('');
    }
  };

  const handleDeleteLeader = (index: number) => {
    const updatedLeaders = coLeaders.filter((_, i) => i !== index);
    onChange(updatedLeaders);
  };

  return (
    <Container>
      <LeadersContainer>
        {coLeaders.map((leader, idx) => (
          <Leader key={idx}>
            <LeaderAvatar>👤</LeaderAvatar>
            <LeaderName>{leader}</LeaderName>
            <DeleteButton onClick={() => handleDeleteLeader(idx)}>×</DeleteButton>
          </Leader>
        ))}
        {coLeaders.length < 3 && (
          <AddLeader>
            <AddInput
              type="text"
              placeholder="+ 이름 입력"
              value={newLeader}
              onChange={e => setNewLeader(e.target.value)}
            />
            <AddButton type={'button'} onClick={handleAddLeader}>
              추가
            </AddButton>
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
});

const AddInput = styled('input', {
  width: '120px',
  padding: '4px 8px',
  borderRadius: '4px',
  border: '1px solid $gray700',
  backgroundColor: '$gray900',
  color: '$white',
  outline: 'none',

  '&::placeholder': {
    color: '$gray500',
  },
});

const AddButton = styled('button', {
  type: 'button', //이거 없으면 제출 처리됨!!
  padding: '4px 8px',
  backgroundColor: '$green500',
  color: '$white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$green400',
  },
});

const ErrorMessage = styled('div', {
  color: '$red500',
  fontSize: '12px',
  marginTop: '8px',
});
