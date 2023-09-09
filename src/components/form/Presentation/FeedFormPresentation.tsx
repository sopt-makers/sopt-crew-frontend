import React, { ChangeEvent } from 'react';
import CancelIcon from '@assets/svg/x.svg';
import { FieldError } from 'react-hook-form';
import { styled } from 'stitches.config';
import FileInput from '../FileInput';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import ImagePreview from './ImagePreview';
import { MAX_FILE_SIZE } from '@type/form';

import { useRouter } from 'next/router';
import { getPresignedUrl, uploadImage } from '@api/meeting';
import { imageS3Bucket } from '@constants/url';

interface PresentationProps {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  handleChangeImage: (index: number, url: string) => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
}
interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

function FeedFormPresentation({
  submitButtonLabel,
  cancelButtonLabel,
  handleChangeImage,
  handleDeleteImage,
  onSubmit,
  disabled = true,
}: PresentationProps) {
  const router = useRouter();

  const onChangeFile = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const [file] = [...e.target.files];
    const url = await uploadFile(file);
    handleChangeImage(index, url);
  };

  const onDeleteFile = (index: number) => () => {
    handleDeleteImage(index);
  };

  const handleAddFiles =
    ({ imageUrls, onChange }: FileChangeHandler) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const newFiles = Array.from(e.target.files);
      if (newFiles.some(file => file.size > MAX_FILE_SIZE)) {
        alert('5MB 이하의 사진만 업로드할 수 있습니다.');
        return;
      }
      const filesCount = imageUrls.length + newFiles.length;
      if (filesCount > 6) {
        alert('이미지는 최대 6개까지 업로드 가능합니다.');
        return;
      } else {
        const urls = await Promise.all(newFiles.map(async file => await uploadFile(file)));
        onChange([...imageUrls, ...urls]);
      }
    };

  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const {
      data: { url, fields },
    } = await getPresignedUrl(extension);
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  return (
    <SForm onSubmit={onSubmit}>
      <div>asd</div>
    </SForm>
  );
}

export default FeedFormPresentation;

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',

  '@tablet': {
    gap: '56px',
  },
});
const STitleField = styled('div', {
  width: '100%',
  maxWidth: '369px',
});
const SFileInputWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',

  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
const SApplicationFieldWrapper = styled('div', {
  display: 'flex',
  color: '$gray100',
  gap: '12px',
});
const SApplicationField = styled('div', {
  width: '100%',
  maxWidth: '205px',

  '@tablet': {
    maxWidth: '151px',
  },
});
const SMemberCountField = styled(SApplicationField);
const SDateFieldWrapper = styled(SApplicationFieldWrapper);
const SDateField = styled(SApplicationField);
const SNeedMentorFieldWrapper = styled('div', {
  position: 'absolute',
  transform: 'translateY(-120%)',
  right: 6,
});
const STargetFieldWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
});
const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '20px',
  alignSelf: 'flex-end',

  '@tablet': {
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: '20px',
    gap: '16px',
  },
});
const Button = styled('button', {
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  background: '$black40',
  borderRadius: '10px',
  fontAg: '18_bold_100',
  color: '$white100',

  '@tablet': {
    gap: '10px',
    width: '100%',
    fontAg: '16_bold_100',
  },
});
const CancelButton = styled(Button, {});
const SubmitButton = styled(Button, {
  background: '$purple100',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.35,
  },
});
