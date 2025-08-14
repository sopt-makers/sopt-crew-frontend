import { getPresignedUrl, uploadImage } from '@api/image';
import { imageS3Bucket } from '@constants/url';
import { MAX_FILE_SIZE } from '@type/form';
import { ChangeEvent } from 'react';

export interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

type useImageHandlerProps = {
  onChangeImage: (index: number, url: string) => void;
  onDeleteImage: (index: number) => void;
};

const useImageHandler = ({ onChangeImage, onDeleteImage }: useImageHandlerProps) => {
  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const { url, fields } = await getPresignedUrl({ contentType: extension ?? '' });
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const handleChangeFile = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const [file] = [...e.target.files];
    const url = await uploadFile(file ?? new File([], 'default.txt'));
    onChangeImage(index, url);
  };

  const handleDeleteFile = (index: number) => () => {
    onDeleteImage(index);
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

  return {
    handleChangeFile,
    handleDeleteFile,
    handleAddFiles,
  };
};

export default useImageHandler;
