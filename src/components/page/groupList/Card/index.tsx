import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { RECRUITMENT_STATUS } from '@constants/status';
import { dateFormat } from '@utils/date';
import Link from 'next/link';
import { ReactNode } from 'react';
import { GroupResponse } from 'src/api/meeting';
import { styled } from 'stitches.config';

interface CardProps {
  bottom?: ReactNode;
  groupData: GroupResponse;
}

function Card({ bottom, groupData }: CardProps) {
  return (
    <Box as="li">
      <Link href={`/detail?id=${groupData.id}`} passHref>
        <a>
          <>
            <Box css={{ position: 'relative' }}>
              <SStatus recruitingStatus={groupData.status}>
                {RECRUITMENT_STATUS[groupData.status]}
              </SStatus>
              <SImageWrapper>
                {/* 전략에 따라 image 태그 스타일링 필요 */}
                <img
                  width="380px"
                  height="260px"
                  src={JSON.parse(groupData.imageURL[0]).url}
                />
              </SImageWrapper>
            </Box>
            <STitleSection>
              <SCategory>{groupData.category}</SCategory>
              <STitle>{groupData.title}</STitle>
            </STitleSection>
            <Box>
              <SInfoRow>
                <SKey>모집 기간</SKey>
                <SValue>
                  {dateFormat(groupData.mStartDate)['YY.MM.DD']} -
                  {dateFormat(groupData.mEndDate)['YY.MM.DD']}
                </SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모집 인원</SKey>
                <SValue>
                  {
                    groupData.appliedInfo.filter(info => info.status === 1)
                      .length
                  }
                  /{groupData.capacity}명
                </SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모임 개설</SKey>
                <SValue>{groupData.user.name}</SValue>
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
  zIndex: '2',
  variants: {
    recruitingStatus: {
      0: {
        backgroundColor: '$purple200',
      },
      1: {
        backgroundColor: '$purple200',
      },
      2: {
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
