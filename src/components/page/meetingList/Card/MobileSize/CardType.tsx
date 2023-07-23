import { Box } from '@components/box/Box';
import { RECRUITMENT_STATUS } from '@constants/option';
import { styled } from 'stitches.config';
import { getResizedImage } from '@utils/image';
import { MobileSizeCardProps } from '.';

function CardType({ meetingData }: Pick<MobileSizeCardProps, 'meetingData'>) {
  return (
    <Box>
      <Box css={{ position: 'relative' }}>
        <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingData.imageURL[0].url, 760)})`,
            backgroundSize: 'cover',
          }}
        />
      </Box>
      <STitleSection>
        <STitle>{meetingData.title}</STitle>
      </STitleSection>
      <Box
        css={{
          display: 'flex',
        }}
      >
        <SMobileValue>{meetingData.category}</SMobileValue>
        <SMobileValue>{meetingData.user.name}</SMobileValue>
      </Box>
    </Box>
  );
}
export default CardType;

const SThumbnailImage = styled('div', {
  width: '162px',
  height: '111px',
  borderRadius: '$8',
});

const SStatus = styled(Box, {
  position: 'absolute',
  top: '16px',
  left: '16px',
  borderRadius: '$8',
  padding: '$3 $8',
  fontStyle: 'T5',
  variants: {
    recruitingStatus: {
      0: {
        backgroundColor: '$gray100',
      },
      1: {
        backgroundColor: '$purple100',
      },
      2: {
        backgroundColor: '$black60',
      },
    },
  },
  '@tablet': {
    fontAg: '10_bold_100',
    top: '8px',
    left: '8px',
    borderRadius: '5px',
  },
});

const STitleSection = styled(Box, {
  my: '$16',
  '@tablet': {
    my: '$8',
  },
});

const STitle = styled('p', {
  maxWidth: '380px',
  fontStyle: 'H2',
  mt: '$8',
  '@tablet': {
    fontAg: '14_semibold_140',
    maxWidth: '162px',
  },
});

const SMobileValue = styled('p', {
  fontAg: '12_medium_100',
  color: '$gray80',
  '& + &': {
    ml: '$8',
  },
  '&:first-child:after': {
    content: '|',
    ml: '$8',
  },
});
