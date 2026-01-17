import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';

interface ShakeEventProps {
  onEndShake: () => void;
}
function ShakeEventContent({ onEndShake }: ShakeEventProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      onEndShake();
    }, 3000);

    return () => clearInterval(interval);
  }, [onEndShake]);

  return (
    <SContainer>
      <SShakeTitle>두구두구두구...</SShakeTitle>
      <SImage src="/group/assets/images/mapEvent/crew_event_shake_final.gif" alt="첫 솝맵 등록 축하 선물" />
    </SContainer>
  );
}

function ShakeEvent({ onEndShake }: ShakeEventProps) {
  const [isShaking, setIsShaking] = useState(false);

  if (isShaking) {
    return (
      <ShakeEventContent
        onEndShake={() => {
          onEndShake();
          setIsShaking(false);
        }}
      />
    );
  }

  return (
    <SContainer>
      <STitleContainer>
        <STitle>{`첫 솝맵 등록\n축하 선물이 도착했어요 💝`}</STitle>
        <SDescription>랜덤으로 15명에게 CU 기프티콘을 드려요</SDescription>
      </STitleContainer>
      <SImage src="/group/assets/images/mapEvent/crew_event_shake_final.png" alt="첫 솝맵 등록 축하 선물" />
      <SButton onClick={() => setIsShaking(true)} size="lg" variant="fill" color="primary">
        선물 확인하기
      </SButton>
    </SContainer>
  );
}

export default ShakeEvent;

const SContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$40',

  margin: '80px auto',
  width: '100%',

  '@mobile': {
    margin: '48px auto',
  },
});

const STitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$6',
});

const STitle = styled('h1', {
  whiteSpace: 'pre-line',
  textAlign: 'center',

  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '42px',
  letterSpacing: '-0.56px',

  color: '$gray10',
});

const SDescription = styled('p', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '30px',
  letterSpacing: '-0.27px',

  color: '$gray300',
});

const SButton = styled(Button, {
  width: '560px',

  '@mobile': {
    width: '320px',
  },
});

const SShakeTitle = styled('h1', {
  marginBottom: '78px',

  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '42px',
  letterSpacing: '-0.56px',
});

const SImage = styled('img', {
  width: '440px',
  height: '440px',

  '@mobile': {
    width: '360px',
    height: '360px',
  },
});
