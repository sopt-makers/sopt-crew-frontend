import { MeetingData } from '@api/meeting/type';
import { ACTION_STATUS } from '@constants/option';
import { getResizedImage } from '@utils/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';
import { styled } from 'stitches.config';

const getNewStatus = (status: number, mstartDate: string, isGroupActive: boolean) => {
  if (status === 0 || status === 1) {
    return status;
  }
  if (new Date(mstartDate) > new Date()) {
    return 2;
  }
  if (isGroupActive) {
    return 3;
  }
  return 4;
};

const getIsGroupActive = (mstartDate: string, mendDate: string) => {
  return dayjs().isBetween(dayjs(mstartDate), dayjs(mendDate), 'day', '[]');
};

const MobileSizeCard: FC<MeetingData> = ({ id, title, category, mStartDate, mEndDate, status, imageURL }) => {
  const isGroupActive = getIsGroupActive(mStartDate, mEndDate);
  const newStatus = getNewStatus(status, mStartDate, isGroupActive);

  return (
    <Link href={`/detail?id=${id}`}>
      <ImageWrapper>
        <SStatus recruitingStatus={newStatus}>{ACTION_STATUS[newStatus]}</SStatus>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(imageURL[0]?.url ?? '', 140)})`,
            backgroundSize: 'cover',
          }}
        />
      </ImageWrapper>
      <STitleSection>
        <STitle>
          {' '}
          <SCategory isStudy={category === 'STUDY'}>{category}</SCategory>
          {title}
        </STitle>
      </STitleSection>
    </Link>
  );
};

export default MobileSizeCard;

const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '140px',
  height: '96px',
  overflow: 'hidden',
  borderRadius: '$8',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SStatus = styled('div', {
  position: 'absolute',
  top: '8px',
  left: '8px',
  borderRadius: '$4',
  padding: '$3 $5',
  fontSize: '11px',
  lineHeight: '14px',
  fontWeight: '600',
  color: '$gray800',
  variants: {
    recruitingStatus: {
      0: {
        background: '$attention',
      },
      1: {
        background: '$secondary',
      },
      2: {
        background: '$gray200',
      },
      3: {
        background: '$success',
        color: '$white',
      },
      4: {
        background: '$gray200',
      },
    },
  },
});

const STitleSection = styled('div', {
  maxWidth: '140px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  flexType: 'verticalCenter',
  mt: '$12',
});

const SCategory = styled('span', {
  mr: '$3',
  variants: {
    isStudy: {
      true: { color: '$secondary' },
      false: { color: '$success' },
    },
  },
});

const STitle = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  color: '$gray10',
  maxWidth: '140px',
  minHeight: '40px',
});
