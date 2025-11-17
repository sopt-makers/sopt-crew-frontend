import FileInput from '@shared/form/FileInput';
import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import ImagePreview from '@shared/form/Presentation/ImageField/ImagePreview';
import { FileChangeHandler } from '@shared/form/Presentation/ImageField/useImageHandler';
import { ChangeEvent } from 'react';
import { styled } from 'stitches.config';

type ImageFieldProps = {
  onChangeFile: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeleteFile: (index: number) => () => void;
  onAddFiles: ({ imageUrls, onChange }: FileChangeHandler) => (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const ImageField = ({ onChangeFile, onDeleteFile, onAddFiles }: ImageFieldProps) => {
  return (
    <div>
      <Label required={true}>소개 이미지</Label>
      <HelpMessage>
        6개까지 첨부 가능하며 5MB 이내로 <br />
        가로는 760px, 세로는520px 사이즈를 권장해요
      </HelpMessage>
      <SFileInputWrapper>
        <FormController
          name="files"
          defaultValue={[]}
          render={({ field: { value: imageUrls, onChange, onBlur }, fieldState: { error } }) => (
            <>
              {(imageUrls as string[]).map((url, idx) => (
                <ImagePreview
                  key={`${url}-${idx}`}
                  url={url}
                  onChange={onChangeFile(idx)}
                  onDelete={onDeleteFile(idx)}
                />
              ))}
              {/* NOTE: 이미지 개수가 6개 미만일때만 파일 입력 필드를 보여준다. */}
              <div style={{ display: imageUrls.length < 6 ? 'block' : 'none' }}>
                <FileInput error={error?.message} onChange={onAddFiles({ imageUrls, onChange })} onBlur={onBlur} />
              </div>
            </>
          )}
        />
      </SFileInputWrapper>
    </div>
  );
};

export default ImageField;

const SFileInputWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
