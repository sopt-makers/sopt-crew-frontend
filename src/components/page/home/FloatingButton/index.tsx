import { ampli } from '@/ampli';
import Plus from '@assets/svg/plus.svg?rect';
import FloatingButtonModal from '@components/modal/FloatingButtonModal';
import ModalBackground from '@components/modal/ModalBackground';
import { useState } from 'react';
import { styled } from 'stitches.config';

//note: deprecated
function FloatingButton() {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    if (!isActive) {
      ampli.clickFeedAction();
    }
    setIsActive(isActive => !isActive);
  };
  const handleOptionClose = () => setIsActive(false);

  return (
    <>
      <ModalBackground
        onClick={handleOptionClose}
        css={{
          background: isActive ? '$grayAlpha800' : 'rgba(0, 0, 0, 0)',
          transition: 'all 0.3s ease',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />
      <Container isActive={isActive}>
        <OptionOpenButton isActive={isActive} onClick={handleButtonClick}>
          <Icon isActive={isActive} />
        </OptionOpenButton>
        <FloatingButtonModal isActive={isActive} handleOptionClose={handleOptionClose} />
      </Container>
    </>
  );
}

export default FloatingButton;

const Container = styled('div', {
  position: 'fixed',
  bottom: '5%',
  right: '5%',
  width: '56px',
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
  width: '100%',
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
