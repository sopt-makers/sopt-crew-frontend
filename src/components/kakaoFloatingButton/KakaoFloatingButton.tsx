import React from 'react';
import KakaoLogoIcon from '@assets/svg/logo_kakao_32.svg';

import { styled } from 'stitches.config';

function KakaoFloatingButton() {
  return (
    <MiniKakaoButton>
      <KakaoLogoIcon
        onClick={() => {
          window.Kakao?.Channel.chat({
            channelPublicId: '_sxaIWG',
          });
        }}
      />
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
});
