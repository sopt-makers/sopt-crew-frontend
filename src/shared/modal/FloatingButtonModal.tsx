import { ampli } from '@/ampli';
import BoltIcon from '@assets/svg/bolt_md.svg';
import GroupIcon from '@assets/svg/floating_button_group_icon.svg';
import MapIcon from '@assets/svg/floating_button_map_icon.svg';
import KakaoLogoIcon from '@assets/svg/logo_kakao.svg';
import { useRouter } from 'next/router';
import { keyframes, styled } from 'stitches.config';

const FloatingButtonModal = ({ isActive }: { isActive: boolean }) => {
  const router = useRouter();

  const handleGroupCreateButtonClick = () => {
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make');
  };

  const handleBoltCreateButtonClick = () => {
    //todo: 번쩍 개설을 위한 정보를 넘겨주면서 라우팅하기
    ampli.clickMakeGroup({ location: router.pathname });
    router.push('/make/flash');
  };

  const handleMapRegisterButtonClick = () => {
    // TODO: 솝맵 등록 페이지 라우팅 & ampli 이벤트 추가
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
        <Button onClick={handleMapRegisterButtonClick}>
          <MapIcon style={{ marginRight: '4px' }} />
          솝맵 등록
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
  '@media (max-width: 768px)': {
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
  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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
