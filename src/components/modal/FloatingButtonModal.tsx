import { ampli } from '@/ampli';
import { fetchMeetingListOfUserAttend } from '@api/API_LEGACY/user';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import BoltIcon from '@assets/svg/bolt_md.svg';
import FeedCreateWithSelectMeetingModal from '@components/feed/Modal/FeedCreateWithSelectMeetingModal';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { keyframes, styled } from 'stitches.config';
import FeedIcon from '../../../public/assets/svg/floating_button_feed_icon.svg';
import GroupIcon from '../../../public/assets/svg/floating_button_group_icon.svg';
import NoJoinedGroupModal from './NoJoinedGroupModal';
import KakaoLogoIcon from '@assets/svg/logo_kakao.svg';

const FloatingButtonModal = (props: { isActive: boolean; handleOptionClose: () => void }) => {
  const { isActive, handleOptionClose } = props;
  const router = useRouter();
  const overlay = useOverlay();
  const { data: me } = useQueryMyProfile();
  const queryClient = useQueryClient();
  const { mutate: fetchUserAttendMeetingListMutate } = useMutation(fetchMeetingListOfUserAttend, {
    onSuccess: data => {
      handleOptionClose();
      queryClient.setQueryData(['fetchMeetingList', 'all'], data);
      if (data.data.length === 0) {
        overlay.open(({ isOpen, close }) => <NoJoinedGroupModal isModalOpened={isOpen} handleModalClose={close} />);
      } else {
        overlay.open(({ isOpen, close }) => (
          <FeedCreateWithSelectMeetingModal isModalOpened={isOpen} handleModalClose={close} />
        ));
      }
    },
  });

  const handleGroupCreateButtonClick = () => {
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make');
  };

  const handleBoltCreateButtonClick = () => {
    //todo: 번쩍 개설을 위한 정보를 넘겨주면서 라우팅하기
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make/flash');
  };

  const handleFeedCreateButtonClick = () => {
    if (me?.orgId) {
      ampli.clickFeedPosting({ user_id: Number(me?.orgId), location: router.pathname });
    }
    fetchUserAttendMeetingListMutate();
  };

  return (
    <Wrapper isActive={isActive}>
      {isActive && (
        <KakaoQuestionButton
          onClick={() => {
            window.Kakao?.Channel.chat({
              channelPublicId: '_sxaIWG',
            });
          }}
        >
          <KakaoLogoIcon />
          카카오톡 문의
        </KakaoQuestionButton>
      )}

      <Container isActive={isActive}>
        <Button onClick={handleBoltCreateButtonClick}>
          <BoltIcon style={{ marginRight: '4px' }} />
          번쩍 개설
        </Button>
        <Button onClick={handleGroupCreateButtonClick}>
          <GroupIcon style={{ marginRight: '4px' }} />
          모임 개설
        </Button>
        <Button onClick={handleFeedCreateButtonClick}>
          <FeedIcon style={{ marginRight: '4px' }} />
          피드 작성
        </Button>
      </Container>
    </Wrapper>
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

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  zIndex: '$3',
  position: 'absolute',
  bottom: '76px',
  right: '5%',

  transition: 'all 0.3s ease',
  variants: {
    isActive: {
      true: {
        animation: `${fadeIn} 200ms ease-out`,
      },
      false: {
        animation: `${fadeOut} 200ms ease-out`,
        opacity: '0',
        display: 'none',
      },
    },
  },
});

const Container = styled('div', {
  width: '160px',
  height: 'auto',

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
        display: 'none',
      },
    },
  },
  '@tablet': {
    width: '140px',
    height: 'auto',
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
  color: '$gray600',
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

const KakaoQuestionButton = styled('button', {
  width: '162px',
  height: '62px',

  display: 'flex',
  padding: '8px 6px',
  paddingLeft: '20px',

  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '22px',
  color: '$gray600',

  alignItems: 'center',
  gap: '4px',
  alignSelf: 'stretch',

  borderRadius: '20px',
  background: '$gray10',
  boxShadow: '0px 6px 20px 0px rgba(0, 0, 0, 0.35)',

  '&:hover': {
    background: '$gray50',
  },
  '&:active': {
    background: '$gray100',
  },

  '@tablet': {
    width: '140px',
    height: '50px',
    borderRadius: '18px',
    bottom: '72px',
    padding: '$6',
    paddingLeft: '$18',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '18px',
  },
});
