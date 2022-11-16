import { useState } from 'react';
import { styled } from 'stitches.config';

interface ImagePreviewProps {
  url: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ImagePreview({
  url,
  onEdit,
  onDelete,
}: ImagePreviewProps) {
  const [showControl, setShowControl] = useState(false);

  return (
    <SContainer
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
    >
      {showControl && (
        <SBackdrop>
          <SEditButton type="button" onClick={onEdit}>
            수정
          </SEditButton>
          <SDeleteButton type="button" onClick={onDelete}>
            삭제
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
  height: '176px',
  borderRadius: '10px',
  overflow: 'hidden',
});
const SImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
const SBackdrop = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'rgba(42, 42, 42, 0.9)',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  zIndex: 1,
});
const SEditButton = styled('button', {
  padding: '8px 10px',
  display: 'flex',
  jusifyContent: 'center',
  alignItems: 'center',
  background: '$purple100',
  borderRadius: '6px',
  fontAg: '16_bold_100',
  color: '$white',
});
const SDeleteButton = styled('button', {
  padding: '8px 10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$black40',
  borderRadius: '6px',
  fontAg: '16_bold_100',
  color: '$white',
});
