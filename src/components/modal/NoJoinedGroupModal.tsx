import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { styled } from 'stitches.config';
import ModalBackground from './ModalBackground';
import { ModalContainerProps } from './ModalContainer';

const NoJoinedGroupModal = ({ isModalOpened, handleModalClose }: ModalContainerProps) => {
  return (
    <Dialog open={isModalOpened} onClose={handleModalClose}>
      <ModalBackground
        onClick={handleModalClose}
        css={{
          zIndex: '$3',
        }}
      />
      <Dialog.Panel>
        <Container>
          <div>
            <Title>내가 가입한 모임이 없어요</Title>
            <Content>가입한 모임이 있어야만 피드를 작성할 수 있어요. 모임을 찾아볼까요?</Content>
          </div>
          <div>
            <Link href="/list">
              <FindGroupButton>모임 찾기</FindGroupButton>
            </Link>
          </div>
        </Container>
      </Dialog.Panel>
    </Dialog>
  );
};

export default NoJoinedGroupModal;

const Container = styled('div', {
  width: '80%',
  maxWidth: '500px',
  minHeight: '222px',
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
  zIndex: '$4',
});

const Title = styled('div', {
  fontStyle: 'T2',
  mb: '$12',
  color: '$gray10',
});

const Content = styled('div', {
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '26px',
  color: '$gray100',
});

const FindGroupButton = styled('p', {
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
  cursor: 'pointer',
});
