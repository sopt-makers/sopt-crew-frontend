import KakaoMapIcon from '@assets/svg/ic_kakao_map.svg';
import NaverMapIcon from '@assets/svg/ic_naver_map.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { styled } from 'stitches.config';

const LinkModalContent = () => {
  return (
    <Container>
      <p>등록자가 입력한 외부 링크로 이동합니다.</p>
      <div>
        <LinkButton>
          <NaverMapIcon />
          네이버 지도
        </LinkButton>
        <LinkButton>
          <KakaoMapIcon />
          카카오 맵
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

export default LinkModalContent;
