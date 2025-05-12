import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';
import { Divider } from '@components/util/Divider';
import { Flex } from '@components/util/layout/Flex';
import { getResizedImage } from '@utils/image';
import { styled } from 'stitches.config';
import { MobileSizeCardProps } from '.';

function ListType({ meetingData }: Omit<MobileSizeCardProps, 'mobileType'>) {
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
          <STitle>{meetingData.title}</STitle>
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
          <Flex>
            {meetingData.meetingKeywordTypes?.map(keyword => (
              <WelcomeTag key={keyword}>{keyword}</WelcomeTag>
            ))}
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
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  ml: '$12',
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

const WelcomeTag = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$3 $8',

  borderRadius: '37px',
  border: '1px solid $gray600',

  color: '$gray100',
  fontStyle: 'L2',
});
