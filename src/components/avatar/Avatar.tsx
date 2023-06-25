import { CSSProperties } from 'react';
import { styled } from 'stitches.config';

interface AvatarProps {
  src: string;
  alt: string;
  sx?: CSSProperties;
}

export default function Avatar({ src, alt, sx }: AvatarProps) {
  return (
    <SContainer style={sx}>
      <SImage src={src} alt={alt} />
    </SContainer>
  );
}

const SContainer = styled('div', {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
const SImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
