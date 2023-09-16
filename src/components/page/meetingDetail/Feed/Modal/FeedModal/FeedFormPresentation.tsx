import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@type/form';
import { styled } from 'stitches.config';

import { Box } from '@components/box/Box';
import CancelIcon from '@assets/svg/x.svg';
import { getResizedImage } from '@utils/image';
import { Divider } from '@components/util/Divider';
import ImagePreview from './ImagePreview';
import CameraIcon from '@assets/svg/camera.svg';
import { ChangeEvent } from 'react';
import { imageS3Bucket } from '@constants/url';
import { getPresignedUrl, uploadImage } from '@api/meeting';
import FormController from '@components/form/FormController';

interface GroupInfo {
  title: string;
  imageUrl: string;
  category: string;
}

interface PresentationProps {
  groupInfo: GroupInfo;
  title: string;
  handleModalClose: () => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}
interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

function FeedFormPresentation({
  groupInfo,
  title,
  handleModalClose,
  handleDeleteImage,
  onSubmit,
  disabled = true,
}: PresentationProps) {
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
    <SFormContainer>
      <form onSubmit={onSubmit}>
        <SFormHeader>
          <CancelIcon onClick={handleModalClose} />
          <SFormName>{title}</SFormName>
          <SSubmitButton type="submit" disabled={disabled}>
            완료
          </SSubmitButton>
        </SFormHeader>
        <SGroupInfoSection>
          <SThumbnailImage
            css={{
              backgroundImage: `url(${getResizedImage(groupInfo.imageUrl, 168)})`,
            }}
          />
          <SCategory>{groupInfo.category}</SCategory>
          <STitle>{groupInfo.title}</STitle>
        </SGroupInfoSection>
        <SDivider />

        <STitleInput type="text" placeholder="피드 제목을 입력해주세요." />
        <SDivider />
        <SFeedContentTextArea placeholder="피드 내용을 입력해주세요." />
        <SDivider />
        <FormController
          name="files"
          defaultValue={[]}
          render={({ field: { value: imageUrls, onChange, onBlur }, fieldState: { error } }) => (
            <>
              {!!(imageUrls as string[]).length && (
                <>
                  <Box
                    css={{
                      display: 'flex',
                      gap: '12px',
                    }}
                  >
                    {(imageUrls as string[]).map((url, idx) => (
                      <SImagePreviewHolder key={`${url}-${idx}`}>
                        <ImagePreview url={url} onDelete={onDeleteFile(idx)} />
                      </SImagePreviewHolder>
                    ))}
                  </Box>
                  <SDivider />
                </>
              )}

              <Box css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SFileInputWrapper>
                  <SFileInput
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                    onChange={handleAddFiles({ imageUrls, onChange })}
                    onBlur={onBlur}
                  />
                  <CameraIcon />
                </SFileInputWrapper>
                <SImageCount>{(imageUrls as string[]).length} / 10</SImageCount>
              </Box>
            </>
          )}
        />
      </form>
    </SFormContainer>
  );
}

export default FeedFormPresentation;

const SFormContainer = styled(Box, {
  width: '100%',
  padding: '40px 30px 30px',
  background: '$black80',
  borderRadius: '15px',

  '@tablet': {
    padding: '40px 0 0 0',
    background: '$black100',
  },
});
const SFormName = styled('h1', {
  fontStyle: 'H1',
  color: '$white100',

  '@tablet': {
    margin: 0,
    borderBottom: '1px solid $black60',
  },
});
const SFormWrapper = styled('div', {
  '@tablet': {
    paddingTop: '40px',
  },
});

const SFormHeader = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SSubmitButton = styled('button', {
  fontStyle: 'T1',
  color: '$purple100',
});

const SGroupInfoSection = styled(Box, {
  mt: '$40',
  flexType: 'verticalCenter',
});

const SThumbnailImage = styled('div', {
  width: '56px',
  height: '56px',
  borderRadius: '$6',
  overflow: 'hidden',
  backgroundColor: '$black80',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SCategory = styled('p', {
  color: '$gray80',
  fontStyle: 'T3',
  ml: '$20',
});

const STitle = styled('p', {
  color: '$white',
  fontStyle: 'T3',
  ml: '$8',
});

const SDivider = styled(Divider, {
  my: '$24',
  backgroundColor: '$black40',
});

const STitleInput = styled('input', {
  width: '100%',
  color: '$white',
  fontStyle: 'H3',
});

const SFeedContentTextArea = styled('textarea', {
  width: '100%',
  height: '208px',
  border: 'none',
  resize: 'none',
  fontStyle: 'B2',
  color: '$white',
  backgroundColor: 'inherit',
});

const SImagePreviewHolder = styled(Box, {
  width: '108px',
  height: '108px',
});

const SFileInputWrapper = styled('label', {
  position: 'relative',
  cursor: 'pointer',
});

const SFileInput = styled('input', {
  position: 'absolute',
  margin: '-1px',
  width: '1px',
  height: '1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});

const SImageCount = styled('p', {
  color: '$white100',
  fontStyle: 'B1',
});
