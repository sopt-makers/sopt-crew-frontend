import { styled } from 'stitches.config';
import { getResizedImage } from '@utils/image';
import { RECRUITMENT_STATUS } from '@constants/option';

const MobileSizeCard = () => {
  return (
    <div>
      <ImageWrapper>
        <SStatus recruitingStatus={1}>{RECRUITMENT_STATUS[1]}</SStatus>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(
              'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
              140
            )})`,
            backgroundSize: 'cover',
          }}
        />
      </ImageWrapper>
      <STitleSection>
        <STitle>
          {' '}
          <SCategory isStudy={true}>행사</SCategory>
          안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
        </STitle>
      </STitleSection>
    </div>
  );
};

export default MobileSizeCard;

const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '140px',
  height: '96px',
  overflow: 'hidden',
  borderRadius: '$8',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SStatus = styled('div', {
  position: 'absolute',
  top: '8px',
  left: '8px',
  borderRadius: '$4',
  padding: '$3 $5',
  fontSize: '11px',
  lineHeight: '14px',
  fontWeight: '600',
  color: '$gray800',
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
  maxWidth: '140px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  flexType: 'verticalCenter',
  mt: '$12',
});

const SCategory = styled('span', {
  mr: '$3',
  variants: {
    isStudy: {
      true: { color: '$secondary' },
      false: { color: '$success' },
    },
  },
});

const STitle = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  color: '$gray10',
  maxWidth: '140px',
  minHeight: '40px',
});
