import { RECRUITMENT_STATUS } from '@constants/option';
import { styled } from 'stitches.config';
import { MobileSizeCardProps } from '.';
import { getResizedImage } from '@utils/image';

function CardType({ meetingData }: Pick<MobileSizeCardProps, 'meetingData'>) {
  return (
    <div>
      <ImageWrapper>
        <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 162)})`,
            backgroundSize: 'cover',
          }}
        />
      </ImageWrapper>
      <STitleSection>
        <STitle>{meetingData.title}</STitle>
      </STitleSection>
      <MobileWrapper>
        <SMobileValue>{meetingData.category}</SMobileValue>
        <SMobileValue>{meetingData.user.name}</SMobileValue>
      </MobileWrapper>
    </div>
  );
}
export default CardType;
const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '162px',
  height: '111px',
  borderRadius: '$8',
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
        backgroundColor: '$gray500',
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
  '@tablet': {
    fontAg: '10_bold_100',
    top: '8px',
    left: '8px',
    borderRadius: '5px',
  },
});

const STitleSection = styled('div', {
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
    minHeight: '40px',
  },
});
const MobileWrapper = styled('div', {
  display: 'flex',
});
const SMobileValue = styled('p', {
  fontAg: '12_medium_100',
  color: '$gray400',
  '& + &': {
    ml: '$8',
  },
  '&:first-child:after': {
    content: '|',
    ml: '$8',
  },
});
