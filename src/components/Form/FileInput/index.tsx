import { HTMLAttributes } from 'react';
import { styled } from 'stitches.config';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import PictureIcon from 'public/assets/svg/picture.svg';
import { ACCEPTED_IMAGE_TYPES } from 'src/types/form';

interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  message?: string;
  required?: boolean;
}

export default function FileInput({
  label,
  message,
  required,
  ...props
}: FileInputProps) {
  return (
    <SContainer>
      {label && <Label required={required}>{label}</Label>}
      {message && <HelpMessage>{message}</HelpMessage>}
      <SInputWrapper>
        <PictureIcon />
        <SInput
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_TYPES.join(', ')}
          {...props}
        />
      </SInputWrapper>
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
  width: '100%',
  maxWidth: '260px',
  height: '176px',
  background: '$black40',
  borderRadius: '10px',
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
