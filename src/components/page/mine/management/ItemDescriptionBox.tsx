import { styled } from 'stitches.config';

const ItemDescriptionBox = () => {
  return (
    <SItemDescriptionBox>
      <SLeft>
        <SProfile>프로필 (상태)</SProfile>
        <SGeneration>최근 기수</SGeneration>
        <SPhone>연락처</SPhone>
        <SDate>신청 일시</SDate>
      </SLeft>
      <SManagement>관리</SManagement>
    </SItemDescriptionBox>
  );
};

export default ItemDescriptionBox;

const SItemDescriptionBox = styled('div', {
  minWidth: 'fit-content',
  border: '1px solid $gray600',
  borderRadius: '15px',
  padding: '$19 0',
  mb: '$28',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  color: '$gray400',
  fontAg: '16_bold_100',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SLeft = styled('div', {
  flexType: 'verticalCenter',
});

const Item = styled('div', {
  textAlign: 'center',
});

const SProfile = styled(Item, {
  width: '$187',
});

const SGeneration = styled(Item, {
  width: '$164',
});

const SPhone = styled(Item, {
  width: '$166',
});

const SDate = styled(Item, {
  width: '$168',
  marginLeft: '$20',
});

const SManagement = styled('div', {
  minWidth: '$28',
  mr: '$90',
});
