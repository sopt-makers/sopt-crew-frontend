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
              <SThumbnailImage
                css={{
                  backgroundImage: `url(${groupData.imageURL[0].url})`,
                }}
              />
            </Box>
            <STitleSection>
              <SCategory>{groupData.category}</SCategory>
              <STitle>{groupData.title}</STitle>
            </STitleSection>
            <Box
              css={{
                '@mobile': {
                  display: 'none',
                },
              }}
            >
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
            <Box
              css={{
                display: 'none',
                '@mobile': {
                  display: 'flex',
                },
              }}
            >
              <SMobileValue>{groupData.category}</SMobileValue>
              <SMobileValue>{groupData.user.name}</SMobileValue>
            </Box>
          </>
        </a>
      </Link>
      {bottom}
    </Box>
  );
}

export default Card;

const SThumbnailImage = styled('div', {
  width: '380px',
  height: '260px',
  overflow: 'hidden',
  borderRadius: '$10',
  backgroundColor: '$black80',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '@mobile': {
    width: '162px',
    height: '111px',
    borderRadius: '$8',
  },
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
        backgroundColor: '$black40',
      },
      1: {
        backgroundColor: '$purple200',
      },
      2: {
        backgroundColor: '$gray80',
      },
    },
  },
  '@mobile': {
    fontAg: '10_bold_100',
    top: '8px',
    left: '8px',
    borderRadius: '5px',
  },
});

const STitleSection = styled(Box, {
  my: '$16',
  '@mobile': {
    my: '$8',
  },
});

const SCategory = styled('p', {
  display: 'inline-block',
  fontAg: '15_bold_100',
  color: '$gray50',
  border: '1px solid $gray50',
  borderRadius: '37px',
  px: '$9',
  py: '$6',
  '@mobile': {
    display: 'none',
  },
});

const STitle = styled('p', {
  maxWidth: '380px',

  fontAg: '22_bold_140',
  mt: '$8',
  '@mobile': {
    fontAg: '14_semibold_140',
    maxWidth: '162px',
  },
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

const SMobileValue = styled('p', {
  fontAg: '12_medium_100',
  color: '$gray80',
  '& + &': {
    ml: '$8',
  },
  '&:first-child:after': {
    content: '|',
    ml: '$8',
  },
});
