import KakaoLogoIcon28 from '@assets/svg/logo_kakao_28.svg';
import KakaoLogoIcon32 from '@assets/svg/logo_kakao_32.svg';

import { useDisplay } from '@hook/useDisplay';
import { styled } from 'stitches.config';

function KakaoFloatingButton() {
  const { isMobile } = useDisplay();

  return (
    <MiniKakaoButton
      onClick={() => {
        window.Kakao?.Channel.chat({
          channelPublicId: '_sxaIWG',
        });
      }}
    >
      {isMobile ? <KakaoLogoIcon28 /> : <KakaoLogoIcon32 />}
    </MiniKakaoButton>
  );
}

export default KakaoFloatingButton;

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

  '&:hover': {
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #FEE500',
  },
  '&:active': {
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), #FEE500',
  },

  '@mobile': {
    '&:hover': {
      background: '#FEE500',
    },
    width: '48px',
    height: '48px',
    padding: '10px',
  },
});
