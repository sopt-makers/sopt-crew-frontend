import Avatar from '@components/@common/avatar/Avatar';
import { styled } from 'stitches.config';
import UserIcon from '@assets/svg/user.svg?rect';
import { CATEGORY_NAME, CategoryType, PART_NAME } from '@constants/option';
import Link from 'next/link';
import { Flex } from '@components/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';

type MobileCardProps = {
  id: number;
  imageURL?: string;
  title: string;
  ownerName: string;
  ownerImage?: string;
  approvedCount: number;
  capacity: number;
  category: string;
  canJoinOnlyActiveGeneration: boolean;
  joinableParts: string[];
};
const MobileCard = ({
  id,
  imageURL,
  title,
  ownerName,
  ownerImage,
  approvedCount,
  capacity,
  category,
  canJoinOnlyActiveGeneration,
  joinableParts,
}: MobileCardProps) => {
  return (
    <Link href={`/detail?id=${id}`}>
      <SCardWrapper>
        <SThumbnailImage src={imageURL} />
        <SMetaWrapper>
          <STitleStyle>{title}</STitleStyle>
          <SMetaStyle></SMetaStyle>
          <Flex>
            <UserIcon width="16" height="16" style={{ alignContent: 'center', marginRight: '6px' }} />
            <SInfoStyle style={{ whiteSpace: 'nowrap' }}>{`${approvedCount}/${capacity}명`}</SInfoStyle>
            <SMetaSubStyle>·</SMetaSubStyle>
            <SInfoStyle>{`${canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수'} / ${joinableParts.map(
              part => PART_NAME[part]
            )}`}</SInfoStyle>
          </Flex>
          <Flex align="center">
            <Avatar
              src={ownerImage}
              alt={`${title} 모임장 프로필`}
              sx={{ width: '18px', height: '18px', margin: '2px 6px 0 0' }}
            />
            <SMetaStyle>{ownerName}</SMetaStyle>
            <SMetaSubStyle>|</SMetaSubStyle>
            <SMetaStyle>{CATEGORY_NAME(category as CategoryType)}</SMetaStyle>
          </Flex>
        </SMetaWrapper>
      </SCardWrapper>
    </Link>
  );
};

export default MobileCard;

const SCardWrapper = styled('article', {
  display: 'flex',
  gap: '$12',

  width: '100%',
});

const SThumbnailImage = styled('img', {
  width: '120px',
  height: '82px',

  borderRadius: '$12',

  backgroundColor: '$gray800',
  objectFit: 'cover',
});

const STitleStyle = styled('h3', {
  width: '100%',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '14px',
});

const SMetaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  gap: '$8',
  width: 'calc(100% - 120px)',

  overflow: 'hidden',
});

const SMetaStyle = styled('p', {
  fontStyle: 'L2',
  color: '$white',
});

const SMetaSubStyle = styled('span', {
  padding: '0 $3',

  fontStyle: 'L2',
  color: '$gray500',
});

const SInfoStyle = styled('p', {
  fontStyle: 'L1',
  color: '$gray300',
});
