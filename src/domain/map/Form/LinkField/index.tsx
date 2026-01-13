import KakaoMapIcon from '@assets/svg/kakao_map.svg?rect';
import NaverMapIcon from '@assets/svg/naver_map.svg?rect';
import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import TextInput from '@shared/form/TextInput';
import { styled } from 'stitches.config';

const LinkField = () => {
  return (
    <div>
      <Label required={true}>링크</Label>
      <HelpMessage>장소 안내를 위해 네이버지도 또는 카카오맵 링크를 입력해 주세요.</HelpMessage>
      <LinkFieldContainer>
        <Title>
          <NaverMapIcon />
          <span>네이버지도</span>
        </Title>
        <FormController
          name="links.naverMapLink"
          render={({ field, fieldState: { error } }) => (
            <TextInput placeholder="네이버지도 링크" error={error?.message} {...field} />
          )}
        ></FormController>
      </LinkFieldContainer>
      <LinkFieldContainer>
        <Title>
          <KakaoMapIcon />
          <span>카카오맵</span>
        </Title>
        <FormController
          name="links.kakaoMapLink"
          render={({ field, fieldState: { error } }) => (
            <TextInput placeholder="카카오맵 링크" error={error?.message} {...field} />
          )}
        ></FormController>
      </LinkFieldContainer>
    </div>
  );
};

const LinkFieldContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '8px',
});

const Title = styled('div', {
  minWidth: '114px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export default LinkField;
