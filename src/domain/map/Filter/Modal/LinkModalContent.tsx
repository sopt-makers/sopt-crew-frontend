import KakaoMapIcon from '@assets/svg/ic_kakao_map.svg';
import NaverMapIcon from '@assets/svg/ic_naver_map.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { IconCheck } from '@sopt-makers/icons';
import { useState } from 'react';
import { styled } from 'stitches.config';
interface LinkModalContentProps {
  onSelect: (link: string) => void;
}

const LinkModalContent = ({ onSelect }: LinkModalContentProps) => {
  const [localSelected, setLocalSelected] = useState<string>('');

  const handleClick = (link: string) => {
    if (localSelected === link) {
      setLocalSelected('');
      onSelect('');
      return;
    }

    setLocalSelected(link);
    onSelect(link);
  };

  return (
    <Container>
      <p>등록자가 입력한 외부 링크로 이동합니다.</p>
      <div>
        <LinkButton type="button" onClick={() => handleClick('naver')}>
          <NaverMapIcon />
          네이버 지도
          {localSelected === 'naver' && <CheckIcon />}
        </LinkButton>
        <LinkButton type="button" onClick={() => handleClick('kakao')}>
          <KakaoMapIcon />
          카카오 맵{localSelected === 'kakao' && <CheckIcon />}
        </LinkButton>
      </div>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$24',
});

const LinkButton = styled('button', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  padding: '$10',
  ...fontsObject.LABEL_3_14_SB,
  color: '$gray10',
});

const CheckIcon = styled(IconCheck, {
  width: '24px',
  height: '24px',
  marginLeft: 'auto',

  color: '$success',
});

export default LinkModalContent;
