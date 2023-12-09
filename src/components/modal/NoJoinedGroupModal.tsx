import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stitches.config';

const NoJoinedGroupModal = () => {
  const router = useRouter();
  return (
    <Container>
      <div>
        <Title>내가 가입한 모임이 없어요</Title>
        <Content>가입한 모임이 있어야만 피드를 작성할 수 있어요. 모임을 찾아볼까요?</Content>
      </div>
      <div>
        <FindGroupButton onClick={() => router.push('/list')}>모임 찾기</FindGroupButton>
      </div>
    </Container>
  );
};

export default NoJoinedGroupModal;

const Container = styled('div', {
  width: '400px',
  height: '222px',
  borderRadius: '14px',
  backgroundColor: '$gray800',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Title = styled('div', {
  fontStyle: 'T2',
  mb: '$12',
});

const Content = styled('div', {
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '26px',
});

const FindGroupButton = styled('button', {
  width: '92px',
  height: '44px',
  borderRadius: '10px',
  backgroundColor: '$white',
  color: '$black',
  flexType: 'center',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
  float: 'right ',
});
