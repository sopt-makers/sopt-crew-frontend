import { CSSProperties } from 'react';
import { styled } from 'stitches.config';

interface AvatarProps {
  src: string;
  alt: string;
  sx?: CSSProperties;
  className?: string;
  Overlay?: React.ReactNode;
}

export default function Avatar({ src, alt, sx, className, Overlay }: AvatarProps) {
  return (
    <SContainer style={sx} className={className}>
      {Overlay}
      <SImage src={src} alt={alt} />
    </SContainer>
  );
}

const SContainer = styled('div', {
  position: 'relative',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  overflow: 'hidden',
  flexType: 'center',
});
const SImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
