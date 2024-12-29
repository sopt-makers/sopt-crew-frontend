import Avatar from '@components/@common/avatar/Avatar';
import { styled } from 'stitches.config';
import UserIcon from '@assets/svg/user.svg?rect';
import { CATEGORY_NAME, CategoryType, PART_NAME } from '@constants/option';
import Link from 'next/link';

type DesktopCardProps = {
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
const DesktopCard = ({
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
}: DesktopCardProps) => {
  return (
    <Link href={`/detail?id=${id}`}>
      <SCardWrapper>
        <SThumbnailImage src={imageURL} />
        <SMetaWrapper style={{ paddingTop: '16px' }}>
          <Avatar src={ownerImage} alt={`${title} 모임장 프로필`} sx={{ width: '18px', height: '18px' }} />
          <SMetaStyle>
            {ownerName}
            <SMetaSubStyle>|</SMetaSubStyle>
            {CATEGORY_NAME(category as CategoryType)}
          </SMetaStyle>
        </SMetaWrapper>
        <STitleStyle>{title}</STitleStyle>
        <SMetaWrapper>
          <UserIcon />
          <SInfoStyle>{`${approvedCount}/${capacity}명`}</SInfoStyle>
          <SInfoStyle>{`${canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수'} / ${joinableParts.map(
            part => PART_NAME[part]
          )}`}</SInfoStyle>
        </SMetaWrapper>
      </SCardWrapper>
    </Link>
  );
};

export default DesktopCard;

const SCardWrapper = styled('article', {
  display: 'flex',
  flexDirection: 'column',

  width: '285px',
  height: '266px',
});

const SThumbnailImage = styled('img', {
  width: '285px',
  height: '180px',

  borderRadius: '$12',

  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const STitleStyle = styled('h3', {
  padding: '$4 0 $8',

  textStyle: 'H4',
});

const SMetaWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
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
