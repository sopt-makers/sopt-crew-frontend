import { ChangeEvent, HTMLAttributes, useState } from 'react';
import { styled } from 'stitches.config';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import PictureIcon from 'public/assets/svg/picture.svg';
import { ACCEPTED_IMAGE_TYPES } from 'src/types/form';

interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  message?: string;
  required?: boolean;
}

export default function FileInput({
  label,
  message,
  required,
  ...props
}: FileInputProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      setPreviewImages([]);
      return;
    }

    const previews = [];
    for (const file of files) {
      previews.push(URL.createObjectURL(file));
    }
    setPreviewImages(previews);
    props.onChange?.(e);
  };

  return (
    <SContainer>
      {label && <Label required={required}>{label}</Label>}
      {message && <HelpMessage>{message}</HelpMessage>}
      {previewImages.length ? (
        <SPreviewList>
          {previewImages.map((image, idx) => (
            <SPreviewImage key={`${image}-${idx}`} src={image} />
          ))}
        </SPreviewList>
      ) : (
        <SInputWrapper>
          <PictureIcon />
          <SInput
            type="file"
            multiple
            accept={ACCEPTED_IMAGE_TYPES.join(', ')}
            {...props}
            onChange={handleChage}
          />
        </SInputWrapper>
      )}
    </SContainer>
  );
}
const SContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
const SInputWrapper = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '260px',
  height: '176px',
  background: '$black40',
  borderRadius: '10px',
  cursor: 'pointer',
});
const SPreviewList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
});
const SPreviewImage = styled('img', {
  width: '100%',
  height: '176px',
  objectFit: 'cover',
  borderRadius: '10px',
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
