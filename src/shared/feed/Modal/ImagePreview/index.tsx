import CancelIcon from '@assets/svg/x.svg';
import { useState } from 'react';
import { styled } from 'stitches.config';

interface ImagePreviewProps {
  url: string;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ImagePreview({ url, onDelete }: ImagePreviewProps) {
  const [showBackdrop, setShowBackdrop] = useState(false);

  return (
    <SContainer onMouseLeave={() => setShowBackdrop(false)} onMouseEnter={() => setShowBackdrop(true)}>
      {showBackdrop && (
        <SBackdrop>
          <SDeleteButton type="button" onClick={onDelete}>
            <CancelIcon />
          </SDeleteButton>
        </SBackdrop>
      )}

      <SImage src={url} alt="" />
    </SContainer>
  );
}

const SContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  maxHeight: '178px',
  aspectRatio: '760 / 520',
  borderRadius: '10px',
  overflow: 'hidden',
});

const SBackdrop = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'rgba(42, 42, 42, 0.6)',
  borderRadius: '10px',
  gap: '8px',
  zIndex: 1,
  display: 'flex',
});

const SImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SDeleteButton = styled('button', {
  display: 'inline',
  color: '$gray10',
  position: 'absolute',
  right: '8px',
  top: '8px',
});
