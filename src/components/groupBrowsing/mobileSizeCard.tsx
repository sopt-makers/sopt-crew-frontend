import React, { FC } from 'react';
import { styled } from 'stitches.config';
import { getResizedImage } from '@utils/image';
import { ACTION_STATUS, CATEGORY_NAME, CategoryType } from '@constants/option';
import Link from 'next/link';
import { GroupBrowsingCardItem, returnIsGroupActive, returnNewStatus } from '@api/API_LEGACY/meeting';

const MobileSizeCard: FC<GroupBrowsingCardItem> = ({ id, title, category, mStartDate, mEndDate, status, imageURL }) => {
  const isGroupActive = returnIsGroupActive(mStartDate, mEndDate);
  const newStatus = returnNewStatus(status, mStartDate, isGroupActive);

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
          <SCategory isStudy={category === 'STUDY'}>{CATEGORY_NAME(category as CategoryType)}</SCategory>
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
