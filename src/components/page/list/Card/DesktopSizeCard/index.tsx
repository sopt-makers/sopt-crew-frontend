import { Flex } from '@components/util/layout/Flex';
import { CategoryKoType, RECRUITMENT_STATUS } from '@constants/option';
import dayjs from 'dayjs';
import { parsePartValueToLabel } from '@api/API_LEGACY/meeting';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';
import { paths } from '@/__generated__/schema2';
import { CategoryChip } from '@components/page/list/Card/DesktopSizeCard/CategoryChip';

interface CardProps {
  meetingData: Omit<
    paths['/user/v2/meeting']['get']['responses']['200']['content']['application/json;charset=UTF-8']['meetings'][number],
    'isCoLeader'
  > & { isCoLeader?: boolean };
  isAllParts: boolean;
}

function DesktopSizeCard({ meetingData, isAllParts }: CardProps) {
  return (
    <div>
      <ImageWrapper>
        <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${meetingData.imageURL[0]?.url})`,
          }}
        />
      </ImageWrapper>

      <STitleSection>
        <CategoryChip
          category={meetingData.category as CategoryKoType}
          welcomeMessage={['YB 환영', 'OB 환영', '입문자 환영']}
        />
        <STitle>{meetingData.title}</STitle>
      </STitleSection>

      <Flex css={{ mb: '$14' }} align="center">
        <SProfileWrapper>
          {meetingData.user.profileImage ? (
            <SProfile src={getResizedImage(meetingData.user.profileImage, 120)} alt="" />
          ) : (
            <ProfileDefaultIcon width={24} height={24} />
          )}
        </SProfileWrapper>
        <SName>{meetingData.user.name}</SName>
      </Flex>
      <SInfoRow>
        <SKey>활동 기간</SKey>
        <SValue>
          {dayjs(meetingData.mStartDate).format('YY.MM.DD')} - {dayjs(meetingData.mEndDate).format('YY.MM.DD')}
        </SValue>
      </SInfoRow>
      <SInfoRow>
        <SKey>모집 대상</SKey>
        <SValue>
          {meetingData.targetActiveGeneration ? `${meetingData.targetActiveGeneration}기` : '전체 기수'} /{' '}
          {isAllParts
            ? '전체 파트'
            : meetingData.joinableParts
                .map(part => parsePartValueToLabel(part))
                .filter(item => item !== null)
                .join(',')}
        </SValue>
      </SInfoRow>
      <SInfoRow>
        <SKey>모집 현황</SKey>
        <SValue>
          {meetingData.approvedCount}/{meetingData.capacity}명
        </SValue>
      </SInfoRow>
    </div>
  );
}

export default DesktopSizeCard;
const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '380px',
  height: '260px',
  overflow: 'hidden',
  borderRadius: '$12',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SStatus = styled('div', {
  position: 'absolute',
  top: '16px',
  left: '16px',
  borderRadius: '$8',
  padding: '$3 $8',
  fontStyle: 'T5',
  variants: {
    recruitingStatus: {
      0: {
        backgroundColor: '$gray600',
      },
      1: {
        backgroundColor: '$secondary',
        color: '$gray950',
      },
      2: {
        backgroundColor: '$gray700',
      },
    },
  },
});

const STitleSection = styled('div', {
  my: '$16',
  '@tablet': {
    my: '$8',
  },
});

const SProfileWrapper = styled('div', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$24',
  height: '$24',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$gray700',
});

const SName = styled('p', {
  fontStyle: 'T5',
});
const STitle = styled('p', {
  maxWidth: '380px',
  fontStyle: 'H2',
  mt: '$8',
});
const SInfoRow = styled(Flex, {
  '& + &': {
    mt: '$4',
  },
});
const SInfo = styled('p', {
  fontStyle: 'B3',
});
const SKey = styled(SInfo, {
  width: '74px',
  color: '$gray500',
  mr: '$12',
  whiteSpace: 'nowrap',
});
const SValue = styled(SInfo, {
  color: '$gray300',
});
