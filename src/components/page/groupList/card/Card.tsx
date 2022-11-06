import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from 'stitches.config';

interface CardProps {
  bottom?: ReactNode;
  id: number;
}

function Card({ bottom, id }: CardProps) {
  return (
    <Box as="li">
      <Link href={`/detail?id=${id}`} passHref>
        <a>
          <>
            <Box css={{ position: 'relative' }}>
              <SStatus isRecruiting={true}>모집중</SStatus>
              <SImageWrapper>
                <Image
                  width="380px"
                  height="260px"
                  src=""
                  layout="responsive"
                />
              </SImageWrapper>
            </Box>
            <STitleSection>
              <SCategory>카테고리</SCategory>
              <STitle>제목이 들어가게 됩니다</STitle>
            </STitleSection>
            <Box>
              <SInfoRow>
                <SKey>모집 기간</SKey>
                <SValue>22.10.21 - 22.10.28</SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모집 인원</SKey>
                <SValue>4/5명</SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모임 생성자</SKey>
                <SValue>홍길동</SValue>
              </SInfoRow>
            </Box>
          </>
        </a>
      </Link>
      {bottom}
    </Box>
  );
}

export default Card;

const SImageWrapper = styled('div', {
  backgroundColor: '$black80',
  borderRadius: '$10',
  overflow: 'hidden',
});

const SStatus = styled(Box, {
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

const STitleSection = styled(Box, {
  my: '$22',
});

const SCategory = styled('p', {
  fontAg: '16_bold_100',
  color: '$gray80',
});

const STitle = styled('p', {
  fontAg: '22_bold_140',
  mt: '$8',
});
const SInfoRow = styled(Flex, {
  '& + &': {
    mt: '$8',
  },
});
const SInfo = styled('p', {
  fontAg: '16_medium_100',
});
const SKey = styled(SInfo, {
  width: '74px',
  color: '$gray80',
  mr: '$16',
});
const SValue = styled(SInfo, {
  color: '$gray60',
});
