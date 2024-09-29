import { HTMLAttributes } from 'react';
import { styled } from 'stitches.config';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import PictureIcon from '@assets/svg/icon-interaction-plus.svg';
import { ACCEPTED_IMAGE_TYPES } from '@type/form';
import ErrorMessage from '../ErrorMessage';

interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  error?: string;
  required?: boolean;
}

export default function FileInput({ label, message, error, required, ...props }: FileInputProps) {
  return (
    <SContainer>
      {label && <Label required={required}>{label}</Label>}
      {message && <HelpMessage>{message}</HelpMessage>}
      <SInputWrapper>
        <PictureIcon />
        <SInput type="file" multiple accept={ACCEPTED_IMAGE_TYPES.join(', ')} {...props} />
      </SInputWrapper>
      {error && <SErrorMessage>{error}</SErrorMessage>}
    </SContainer>
  );
}
const SContainer = styled('div', {
  width: '260px',
  display: 'flex',
  flexDirection: 'column',
});
const SInputWrapper = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  maxHeight: '176px',
  aspectRatio: '40 / 27',
  background: '$gray700',
  color: '$gray400',
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
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
