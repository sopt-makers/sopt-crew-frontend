import { fetchMeetingListOfUserAttend } from '@api/user';
import FeedCreateWithSelectMeetingModal from '@components/feed/Modal/FeedCreateWithSelectMeetingModal';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { keyframes, styled } from 'stitches.config';
import FeedIcon from '../../../public/assets/svg/floating_button_feed_icon.svg';
import GroupIcon from '../../../public/assets/svg/floating_button_group_icon.svg';

const FloatingButtonModal = (props: { isActive: boolean }) => {
  const { isActive } = props;
  const router = useRouter();

  const overlay = useOverlay();
  const queryClient = useQueryClient();
  const { mutate: fetchUserAttendMeetingListMutate } = useMutation(fetchMeetingListOfUserAttend, {
    onSuccess: data => {
      queryClient.setQueryData(['fetchMeetingList', 'all'], data);
      // TODO: 모임이 없을때 있을떄 분기처리 필요.
      overlay.open(({ isOpen, close }) => (
        <FeedCreateWithSelectMeetingModal isModalOpened={isOpen} handleModalClose={close} />
      ));
    },
  });

  const handleFeedCreateButtonClick = () => fetchUserAttendMeetingListMutate();
  const handleGroupCreateButtonClick = () => router.push('/make');

  return (
    <Container isActive={isActive}>
      <Button onClick={handleGroupCreateButtonClick}>
        <GroupIcon style={{ marginRight: '4px' }} />
        모임 개설
      </Button>
      <Button onClick={handleFeedCreateButtonClick}>
        <FeedIcon style={{ marginRight: '4px' }} />
        피드 작성
      </Button>
    </Container>
  );
};

export default FloatingButtonModal;

const fadeIn = keyframes({
  from: { opacity: '0', transform: 'translateY(7px)' },
  to: { opacity: '1', transform: 'translateY(0px)' },
});

const fadeOut = keyframes({
  from: { transform: 'translateY(0px)' },
  to: { opacity: '0', transform: 'translateY(7px)' },
});

const Container = styled('div', {
  width: '160px',
  height: '112px',
  zIndex: '$3',
  position: 'absolute',
  bottom: '76px',
  right: '5%',
  backgroundColor: '$gray10',
  borderRadius: '20px',
  color: '$gray600',
  flexType: 'center',
  flexWrap: 'wrap',
  transition: 'all 0.3s ease',
  padding: '$8 $6 $8 $6',
  variants: {
    isActive: {
      true: {
        animation: `${fadeIn} 200ms ease-out`,
      },
      false: {
        animation: `${fadeOut} 200ms ease-out`,
        opacity: '0',
      },
    },
  },
  '@tablet': {
    width: '140px',
    height: '90px',
    borderRadius: '18px',
    bottom: '72px',
    padding: '$6 $0 $6 $4',
  },
});

const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '46px',
  paddingLeft: '12px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '22px',
  '&:hover': {
    borderRadius: '16px',
    backgroundColor: '$gray30',
  },
  '@tablet': {
    '&:hover': {
      backgroundColor: '$gray10',
    },
    height: '38px',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '18px',
  },
});
