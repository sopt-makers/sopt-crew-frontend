import { fontsObject } from '@sopt-makers/fonts';
import { IconCheck } from '@sopt-makers/icons';
import { useState } from 'react';
import { styled } from 'stitches.config';
import { LINK_OPTIONS } from './constant';
import { MapLinkKey } from './type';
interface LinkModalContentProps {
  onSelect: (link: MapLinkKey | null) => void;
}

const LinkModalContent = ({ onSelect }: LinkModalContentProps) => {
  const [localSelected, setLocalSelected] = useState<MapLinkKey | null>(null);

  const handleClick = (link: MapLinkKey) => {
    if (localSelected === link) {
      setLocalSelected(null);
      onSelect(null);
      return;
    }

    setLocalSelected(link);
    onSelect(link);
  };

  return (
    <Container>
      <p>등록자가 입력한 외부 링크로 이동합니다.</p>
      <div>
        {LINK_OPTIONS.map(({ key, label, Icon }) => (
          <LinkButton key={key} type="button" onClick={() => handleClick(key)} data-selected={localSelected === key}>
            <Icon />
            {label}
            {localSelected === key && <CheckIcon />}
          </LinkButton>
        ))}
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
