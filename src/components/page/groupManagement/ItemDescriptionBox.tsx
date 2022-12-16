import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ItemDescriptionBox = () => {
  return (
    <SItemDescriptionBox>
      <div>
        <SType>유형</SType>
        <SProfile>프로필 (상태)</SProfile>
        <SDetail>상세 내역</SDetail>
        <span>신청 일자</span>
      </div>
      <span>관리</span>
    </SItemDescriptionBox>
  );
};

export default ItemDescriptionBox;

const SItemDescriptionBox = styled(Box, {
  border: '1px solid $black40',
  borderRadius: '15px',
  padding: '$19 $82 $19 $35',
  mb: '$28',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  '& span': {
    color: '$gray80',
    fontAg: '16_bold_100',
  },

  '@mobile': {
    display: 'none',
  },
});

const SType = styled('span', {
  mr: '$68',
});

const SProfile = styled('span', {
  mr: '$84',
});

const SDetail = styled('span', {
  mr: '$70',
});
