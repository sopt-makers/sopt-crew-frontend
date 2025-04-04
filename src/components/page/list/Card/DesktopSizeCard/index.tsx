import { Flex } from '@components/util/layout/Flex';
import { CategoryKoType } from '@constants/option';
import { MeetingListOfFilterResponse } from '@api/API_LEGACY/meeting';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';
import { CategoryChip } from '@components/page/list/Card/DesktopSizeCard/CategoryChip';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';
import { MeetingInformation } from '@components/page/list/Card/DesktopSizeCard/constant';

interface CardProps {
  meetingData: MeetingListOfFilterResponse['meetings'][number];
  isFlash?: boolean;
  welcomeMessageTypes?: string[];
  flashDetailInfo?: {
    label: string;
    value: () => string;
  }[];
}

function DesktopSizeCard({ meetingData, isFlash = false, welcomeMessageTypes, flashDetailInfo }: CardProps) {
  const detailInfo = isFlash && flashDetailInfo ? flashDetailInfo : MeetingInformation(meetingData);

  return (
    <div>
      <ImageWrapper>
        <RecruitmentStatusTag status={meetingData.status} style={{ position: 'absolute', top: '16px', left: '16px' }} />
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 380)})`,
          }}
        />
      </ImageWrapper>

      <STitleSection>
        <CategoryChip category={meetingData.category as CategoryKoType} welcomeMessage={welcomeMessageTypes} />
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
      {detailInfo.map(({ label, value }) => (
        <SInfoRow key={label}>
          <SKey>{label}</SKey>
          <SValue>{value()}</SValue>
        </SInfoRow>
      ))}
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
