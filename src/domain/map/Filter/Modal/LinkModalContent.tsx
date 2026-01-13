import { fontsObject } from '@sopt-makers/fonts';
import { IconCheck } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui'; // Button 컴포넌트 import (경로 확인 필요)
import { useState } from 'react';
import { styled } from 'stitches.config';
import { LINK_OPTIONS } from './constant';
import { MapLinkKey } from './type';

interface LinkModalContentProps {
  onClose: () => void;
  onConfirm: (link: MapLinkKey) => void;
}

const LinkModalContent = ({ onClose, onConfirm }: LinkModalContentProps) => {
  const [localSelected, setLocalSelected] = useState<MapLinkKey | null>(null);

  const handleClick = (link: MapLinkKey) => {
    if (localSelected === link) {
      setLocalSelected(null);
      return;
    }
    setLocalSelected(link);
  };

  const handleConfirmClick = () => {
    if (localSelected) {
      onConfirm(localSelected);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Description>등록자가 입력한 외부 링크로 이동합니다.</Description>
        <div>
          {LINK_OPTIONS.map(({ key, label, Icon }) => (
            <LinkButton key={key} type="button" onClick={() => handleClick(key)} data-selected={localSelected === key}>
              <Icon />
              {label}
              {localSelected === key && <CheckIcon />}
            </LinkButton>
          ))}
        </div>
      </ContentWrapper>

      <ButtonWrapper>
        <Button theme="black" size="md" rounded="md" onClick={onClose} style={{ flex: 1 }}>
          취소
        </Button>
        <Button
          theme="white"
          size="md"
          rounded="md"
          onClick={handleConfirmClick}
          disabled={!localSelected}
          style={{ flex: 1 }}
        >
          이동하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default LinkModalContent;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const ContentWrapper = styled('div', {
  flex: 1,
  minHeight: '$24',
  overflow: 'auto',
});

const Description = styled('p', {
  marginBottom: '$24',
  ...fontsObject.BODY_3_14_R,
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

const ButtonWrapper = styled('div', {
  display: 'flex',
  gap: '$9',
  width: '100%',
  marginTop: '$32',
});
