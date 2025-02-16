import { ampli } from '@/ampli';
import PlusIcon from '@assets/svg/plus.svg';
import Plus from '@assets/svg/plus.svg?rect';
import FloatingButtonModal from '@components/modal/FloatingButtonModal';
import ModalBackground from '@components/modal/ModalBackground';
import { useDisplay } from '@hooks/useDisplay';
import { useState } from 'react';
import { styled } from 'stitches.config';
import KakaoLogoIcon from '@assets/svg/logo_kakao_32.svg';

function FloatingButton() {
  const [isActive, setIsActive] = useState(false);
  const { isTablet, isMobile } = useDisplay();

  const handleButtonClick = () => {
    if (!isActive) {
      ampli.clickFeedAction();
    }
    setIsActive(isActive => !isActive);
  };
  const handleOptionClose = () => setIsActive(false);

  return (
    <>
      <ButtonWrapper>
        {!isActive && (
          <MiniKakaoButton>
            <KakaoLogoIcon
              onClick={() => {
                window.Kakao?.Channel.chat({
                  channelPublicId: '_sxaIWG',
                });
              }}
            />
          </MiniKakaoButton>
        )}

        <Container isActive={isActive}>
          {isTablet || isMobile ? (
            <OptionOpenButton isActive={isActive} onClick={handleButtonClick}>
              <Icon isActive={isActive} />
            </OptionOpenButton>
          ) : isActive ? (
            <OptionOpenButton isActive={isActive} onClick={handleButtonClick}>
              <Icon isActive={isActive} />
            </OptionOpenButton>
          ) : (
            <SMakeMeetingButton onClick={handleButtonClick}>
              <PlusIcon />
              <span>개설하기</span>
            </SMakeMeetingButton>
          )}

          <FloatingButtonModal isActive={isActive} handleOptionClose={handleOptionClose} />
        </Container>
      </ButtonWrapper>
    </>
  );
}

export default FloatingButton;

const Container = styled('div', {
  maxWidth: '142px',
  height: '56px',
  borderRadius: '20px',
  flexType: 'center',
  background: '$white',
  zIndex: '$2',
  transition: 'all 0.3s ease',
  variants: {
    isActive: {
      true: {
        background: '$gray500',
      },
    },
  },

  '@tablet': {
    width: '48px',
    height: '48px',
    borderRadius: '18px',
  },
});

const OptionOpenButton = styled('button', {
  width: '56px',
  height: '100%',
  flexType: 'center',
  background: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  variants: {
    isActive: {
      true: {
        transform: 'rotate(-45deg)',
      },
    },
  },
});

const Icon = styled(Plus, {
  width: '30px',
  height: '30px',
  '& path': {
    strokeWidth: '1.3px',
  },
  transition: 'all 0.3s ease',
  variants: {
    isActive: {
      true: {
        '& path': {
          stroke: '$white',
        },
      },
    },
  },
  '@tablet': {
    width: '24px',
    height: '24px',
  },
});

const SMakeMeetingButton = styled('button', {
  flexType: 'verticalCenter',
  padding: '$16 $24 $16 $20',
  background: '$gray10',
  borderRadius: '16px',
  '& > span': {
    ml: '$12',
    fontAg: '18_bold_100',
    color: '$gray950',
  },
  '@tablet': {
    display: 'none',
  },
});

const MiniKakaoButton = styled('button', {
  display: 'flex',
  flexShrink: 0,
  width: '56px',
  height: '56px',
  padding: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '20px',
  background: '#FEE500',
});

const ButtonWrapper = styled('button', {
  position: 'fixed',
  bottom: '5%',
  right: '5%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '$20',
});
