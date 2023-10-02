import { CSSProperties } from 'react';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';

interface AvatarProps {
  src?: string;
  alt: string;
  sx?: CSSProperties;
  className?: string;
  Overlay?: React.ReactNode;
}

export default function Avatar({ src, alt, sx, className, Overlay }: AvatarProps) {
  return (
    <SContainer style={sx} className={className}>
      {Overlay}
      {src ? <SImage src={getResizedImage(src, 32)} alt={alt} /> : <ProfileDefaultIcon />}
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
