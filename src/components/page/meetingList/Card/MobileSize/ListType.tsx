import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { RECRUITMENT_STATUS } from '@constants/option';
import { parsePartValueToLabel } from '@api/meeting';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';
import { Divider } from '@components/util/Divider';
import { MobileSizeCardProps } from '.';

function ListType({ meetingData, isAllParts }: Omit<MobileSizeCardProps, 'mobileType'>) {
  return (
    <Box css={{ width: '100%' }}>
      <Flex align="center" css={{ mb: '$16' }}>
        <Box css={{ position: 'relative' }}>
          <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
          <SThumbnailImage
            css={{
              backgroundImage: `url(${getResizedImage(meetingData.imageURL[0].url, 760)})`,
            }}
          />
        </Box>
        <Box css={{ ml: '$12' }}>
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
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
}

export default ListType;

const SThumbnailImage = styled('div', {
  width: '120px',
  height: '82px',
  borderRadius: '$8',
  overflow: 'hidden',
  backgroundColor: '$black80',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SStatus = styled(Box, {
  position: 'absolute',
  fontStyle: 'B4',
  top: '8px',
  left: '8px',
  borderRadius: '5px',
  padding: '$2 $6',
  variants: {
    recruitingStatus: {
      0: {
        backgroundColor: '$gray100',
      },
      1: {
        backgroundColor: '$orange100',
        color: '$black100',
      },
      2: {
        backgroundColor: '$black60',
      },
    },
  },
});

const STitleSection = styled(Box, {
  my: '$8',
});

const SProfileWrapper = styled(Box, {
  flexType: 'verticalCenter',
  color: '$white100',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$20',
  height: '$20',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$black60',
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
  color: '$gray60',
  '& + &': {
    ml: '$4',
  },
});

const SCategory = styled(SUserInfo, {
  color: '$gray40',
});
const SInfoRow = styled(Flex, {
  mt: '$8',
  mb: '$10',
});
const SInfo = styled('p', {
  fontStyle: 'T6',
});
const SKey = styled(SInfo, {
  color: '$gray100',
  mr: '$4',
  whiteSpace: 'nowrap',
});
const SValue = styled(SInfo, {
  color: '$gray60',
  wordBreak: 'keep-all',
});
