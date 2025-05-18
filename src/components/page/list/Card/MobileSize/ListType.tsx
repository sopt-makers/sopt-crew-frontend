import { Flex } from '@components/util/layout/Flex';
import { parsePartValueToLabel } from '@api/API_LEGACY/meeting';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';
import { Divider } from '@components/util/Divider';
import { MobileSizeCardProps } from '.';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';

function ListType({ meetingData, isAllParts }: Omit<MobileSizeCardProps, 'mobileType'>) {
  return (
    <Container>
      <Flex align="center" css={{ mb: '$16' }}>
        <ImageWrapper>
          <RecruitmentStatusTag status={meetingData.status} style={{ position: 'absolute', top: '8px', left: '8px' }} />
          <SThumbnailImage
            css={{
              backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 120)})`,
            }}
          />
        </ImageWrapper>
        <InfoGroup>
          <STitleSection>
            <STitle>{meetingData.title}</STitle>
          </STitleSection>
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
          <Flex align="center">
            <SProfileWrapper>
              {meetingData.user.profileImage ? (
                <SProfile src={getResizedImage(meetingData.user.profileImage, 120)} alt="" />
              ) : (
                <ProfileDefaultIcon width={20} height={20} />
              )}
            </SProfileWrapper>
            <SUserInfo>{meetingData.user.name}</SUserInfo>
            <SUserInfo>|</SUserInfo>
            <SCategory>{meetingData.category}</SCategory>
          </Flex>
        </InfoGroup>
      </Flex>
      <Divider />
    </Container>
  );
}

export default ListType;

const Container = styled('div', {
  width: '100%',
});
const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '120px',
  height: '82px',
  borderRadius: '$8',
  overflow: 'hidden',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const InfoGroup = styled('div', {
  ml: '$12',
});
const STitleSection = styled('div', {
  my: '$8',
});

const SProfileWrapper = styled('div', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$20',
  height: '$20',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$gray700',
});

const STitle = styled('p', {
  fontStyle: 'H5',
  maxWidth: 'calc(100vw - 32px - 12px - 120px)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});

const SUserInfo = styled('p', {
  fontStyle: 'B4',
  color: '$gray300',
  '& + &': {
    ml: '$4',
  },
});

const SCategory = styled(SUserInfo, {
  color: '$gray200',
});
const SInfoRow = styled(Flex, {
  mt: '$8',
  mb: '$10',
});
const SInfo = styled('p', {
  fontStyle: 'T6',
});
const SKey = styled(SInfo, {
  color: '$gray500',
  mr: '$4',
  whiteSpace: 'nowrap',
});
const SValue = styled(SInfo, {
  color: '$gray300',
  wordBreak: 'keep-all',
});
