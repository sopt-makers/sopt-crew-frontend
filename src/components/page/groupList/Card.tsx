import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import Image from 'next/image';
import { styled } from 'stitches.config';

function Card() {
  return (
    <Box as="li">
      <Box css={{ position: 'relative' }}>
        <Status isRecruiting={true}>모집중</Status>
        <ImageWrapper>
          <Image width="380px" height="260px" src="" />
        </ImageWrapper>
      </Box>
      <TitleSection>
        <Category>카테고리</Category>
        <Title>제목이 들어가게 됩니다</Title>
      </TitleSection>
      <Box>
        <InfoRow>
          <Key>모집 기간</Key>
          <Value>22.10.21 - 22.10.28</Value>
        </InfoRow>
        <InfoRow>
          <Key>모집 인원</Key>
          <Value>4/5명</Value>
        </InfoRow>
        <InfoRow>
          <Key>모임 생성자</Key>
          <Value>홍길동</Value>
        </InfoRow>
      </Box>
    </Box>
  );
}

export default Card;

const ImageWrapper = styled('div', {
  backgroundColor: '$black80',
  borderRadius: '$10',
  overflow: 'hidden',
});

const Status = styled(Box, {
  position: 'absolute',
  top: '16px',
  left: '16px',
  borderRadius: '$8',
  px: '$8',
  py: '$4',
  fontAg: '16_bold_100',
  variants: {
    isRecruiting: {
      true: {
        backgroundColor: '$purple200',
      },
      false: {
        backgroundColor: '$gray80',
      },
    },
  },
});

const TitleSection = styled(Box, {
  my: '$22',
});

const Category = styled('p', {
  fontAg: '16_bold_100',
  color: '$gray80',
});

const Title = styled('p', {
  fontAg: '22_bold_140',
  mt: '$8',
});
const InfoRow = styled(Flex, {
  '& + &': {
    mt: '$8',
  },
});
const Info = styled('p', {
  fontAg: '16_medium_100',
});
const Key = styled(Info, {
  width: '74px',
  color: '$gray80',
  mr: '$16',
});
const Value = styled(Info, {
  color: '$gray60',
});
