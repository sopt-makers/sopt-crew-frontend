import { nanoid } from 'nanoid';
import React, { useMemo, useState } from 'react';
import { ACCEPTED_IMAGE_TYPES } from '@type/form';
import { styled } from 'stitches.config';

interface ImagePreviewProps {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ImagePreview({ url, onChange, onDelete }: ImagePreviewProps) {
  const id = useMemo(() => nanoid(), []);
  const [showControl, setShowControl] = useState(false);

  return (
    <SContainer onMouseEnter={() => setShowControl(true)} onMouseLeave={() => setShowControl(false)}>
      {showControl && (
        <SBackdrop>
          <SEditButton htmlFor={id}>수정</SEditButton>
          <SDeleteButton type="button" onClick={onDelete}>
            삭제
          </SDeleteButton>
        </SBackdrop>
      )}
      <SImage src={url} alt="" />
      <SInput id={id} type="file" accept={ACCEPTED_IMAGE_TYPES.join(', ')} onChange={onChange} />
    </SContainer>
  );
}

const SContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  maxHeight: '176px',
  aspectRatio: '40 / 27',
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
const SEditButton = styled('label', {
  padding: '8px 10px',
  display: 'flex',
  jusifyContent: 'center',
  alignItems: 'center',
  background: '$purple100',
  borderRadius: '6px',
  fontAg: '16_bold_100',
  color: '$white100',
  cursor: 'pointer',
});
const SInput = styled('input', {
  position: 'absolute',
  margin: '-1px',
  width: '1px',
  height: '1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});
const SDeleteButton = styled('button', {
  padding: '8px 10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$black40',
  borderRadius: '6px',
  fontAg: '16_bold_100',
  color: '$white100',
});
