import { ampli } from '@/ampli';
import PlusIcon from '@assets/svg/plus.svg';
import Plus from '@assets/svg/plus.svg?rect';
import FloatingButtonModal from '@components/modal/FloatingButtonModal';
import { useDisplay } from '@hooks/useDisplay';
import { useState } from 'react';
import { styled } from 'stitches.config';
import KakaoFloatingButton from '@components/FloatingButton/kakaoFloatingButton/KakaoFloatingButton';

function FloatingButton() {
  const [isActive, setIsActive] = useState(false);
  const { isMobile } = useDisplay();

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
        {!isActive && <KakaoFloatingButton />}

        <Container isActive={isActive}>
          {isMobile ? (
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

  '@mobile': {
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
  '@mobile': {
    width: '24px',
    height: '24px',
  },
});

const SMakeMeetingButton = styled('button', {
  width: '100%',
  height: '100%',
  flexType: 'verticalCenter',
  padding: '$16 $24 $16 $20',
  background: '$gray10',
  borderRadius: '20px',
  '&:hover': {
    background: '$gray50',
  },
  '&:active': {
    background: '$gray100',
  },
  '& > span': {
    ml: '$12',
    fontAg: '18_bold_100',
    color: '$gray950',
  },
  '@mobile': {
    display: 'none',
  },
});

const ButtonWrapper = styled('button', {
  position: 'fixed',
  bottom: '5%',
  right: '5%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '$20',
  '@mobile': {
    gap: '$16',
  },
});
