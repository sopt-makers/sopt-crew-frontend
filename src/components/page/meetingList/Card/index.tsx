import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { RECRUITMENT_STATUS } from '@constants/option';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MeetingResponse } from 'src/api/meeting';
import { styled } from 'stitches.config';

interface CardProps {
  bottom?: ReactNode;
  meetingData: MeetingResponse;
}

function Card({ bottom, meetingData }: CardProps) {
  return (
    <Box as="li">
      <Link href={`/detail?id=${meetingData.id}`} passHref>
        <a>
          <>
            <Box css={{ position: 'relative' }}>
              <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
              <SThumbnailImage
                css={{
                  backgroundImage: `url(${meetingData.imageURL[0].url})`,
                }}
              />
            </Box>
            <STitleSection>
              <SCategory>{meetingData.category}</SCategory>
              <STitle>{meetingData.title}</STitle>
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
                  {dayjs(meetingData.mStartDate).format('YY.MM.DD')} - {dayjs(meetingData.mEndDate).format('YY.MM.DD')}
                </SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모집 인원</SKey>
                <SValue>
                  {meetingData.appliedInfo.filter(info => info.status === 1).length}/{meetingData.capacity}명
                </SValue>
              </SInfoRow>
              <SInfoRow>
                <SKey>모임 개설</SKey>
                <SValue>{meetingData.user.name}</SValue>
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
              <SMobileValue>{meetingData.category}</SMobileValue>
              <SMobileValue>{meetingData.user.name}</SMobileValue>
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
