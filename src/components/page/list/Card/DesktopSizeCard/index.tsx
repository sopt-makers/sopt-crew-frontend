import { MeetingListResponse } from '@api/API_LEGACY/meeting';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { CategoryChip } from '@components/page/list/Card/DesktopSizeCard/CategoryChip';
import { MeetingInformation } from '@components/page/list/Card/DesktopSizeCard/constant';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';
import { Flex } from '@components/util/layout/Flex';
import { CategoryKoType } from '@constants/option';
import { Tag } from '@sopt-makers/ui';
import { getResizedImage } from '@utils/image';
import { styled } from 'stitches.config';

interface CardProps {
  meetingData: MeetingListResponse['meetings'][number];
  isFlash?: boolean;
  flashDetailInfo?: {
    label: string;
    value: () => string;
    isValid: boolean;
  }[];
  flashCount?: string;
}

function DesktopSizeCard({ meetingData, isFlash = false, flashDetailInfo, flashCount }: CardProps) {
  const detailInfo = isFlash && flashDetailInfo ? flashDetailInfo : MeetingInformation(meetingData);

  return (
    <div>
      <ImageWrapper>
        <RecruitmentStatusTag status={meetingData.status} style={{ position: 'absolute', top: '16px', left: '16px' }} />
        <STag size="md" type="solid">
          {isFlash ? flashCount : `${meetingData.approvedCount} / ${meetingData.capacity}명`}
        </STag>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 380)})`,
          }}
        />
      </ImageWrapper>

      <STitleSection>
        <CategoryChip
          category={meetingData.category as CategoryKoType}
          meetingKeywordTypes={meetingData.meetingKeywordTypes}
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
      {detailInfo.map(({ label, value, isValid }) => (
        <SInfoRow key={label}>
          {isValid ? (
            <>
              <SKey>{label}</SKey>
              <SValue>{value()}</SValue>
            </>
          ) : null}
        </SInfoRow>
      ))}
    </div>
  );
}

export default DesktopSizeCard;
const ImageWrapper = styled('div', {
  position: 'relative',
});

const STag = styled(Tag, {
  position: 'absolute',
  top: '16px',
  right: '16px',
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

const STitleSection = styled('div', {
  my: '$16',
  '@media (max-width: 768px)': {
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
