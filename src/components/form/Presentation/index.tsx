import React, { ChangeEvent, useState } from 'react';
import CancelIcon from 'public/assets/svg/x.svg';
import { FieldError } from 'react-hook-form';
import { categories } from 'src/data/categories';
import { styled } from 'stitches.config';
import FileInput from '../FileInput';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Select from '../Select';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import ImagePreview from './ImagePreview';

interface PresentationProps {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  imageUrls: string[];
  handleChangeImage: (index: number, file: File) => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
interface FileChangeHandler {
  value: File[];
  onChange: (...event: unknown[]) => void;
}

function Presentation({
  submitButtonLabel,
  cancelButtonLabel,
  imageUrls,
  handleChangeImage,
  handleDeleteImage,
  onSubmit,
}: PresentationProps) {
  const [filename, setFilename] = useState<string>('');

  const onChangeFile =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        setFilename('');
        return;
      }
      const [file] = [...e.target.files];
      handleChangeImage(index, file);
    };

  const onDeleteFile = (index: number) => () => {
    handleDeleteImage(index);
    setFilename('');
  };

  const handleAddFiles =
    ({ value, onChange }: FileChangeHandler) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const newFiles = [...value, ...e.target.files];
      if (newFiles.length > 6) {
        // TODO: file 개수 validation
        alert('이미지는 최대 6개까지 업로드 가능합니다.');
        return;
      }
      setFilename(e.target.value);
      onChange(newFiles);
    };

  return (
    <SForm onSubmit={onSubmit}>
      {/* 모임 제목 */}
      <STitleField>
        <FormController
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="모임 제목"
              message="최대 30자 이내로 입력"
              placeholder="제목 입력"
              required
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </STitleField>

      {/* 모임 카테고리 */}
      <FormController
        name="category"
        defaultValue={categories[0]}
        render={({ field: { value, onChange, onBlur }, fieldState }) => {
          const error = (
            fieldState.error as (FieldError & { value: FieldError }) | undefined
          )?.value;
          return (
            <Select
              label="모임 카테고리"
              options={categories}
              required
              error={error?.message}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        }}
      ></FormController>

      {/* 이미지 */}
      <div>
        <Label required={true}>이미지</Label>
        <HelpMessage>최대 6개까지 첨부 가능, 이미지 사이즈 제약</HelpMessage>
        <SFileInputWrapper>
          {imageUrls.length > 0 &&
            imageUrls.map((url, idx) => (
              <ImagePreview
                key={`${url}-${idx}`}
                url={url}
                onChange={onChangeFile(idx)}
                onDelete={onDeleteFile(idx)}
              />
            ))}
          {/* NOTE: 이미지 개수가 6개 미만일때만 파일 입력 필드를 보여준다. */}
          <div style={{ display: imageUrls.length < 6 ? 'block' : 'none' }}>
            <FormController
              name="files"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FileInput
                  // NOTE: FileInput의 value는 filename(string)이고, FormController의 value는 File[] 이다.
                  error={error?.message}
                  value={filename}
                  onChange={handleAddFiles({ value, onChange })}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
        </SFileInputWrapper>
      </div>

      {/* 모집 기간 */}
      <div>
        <Label required={true}>모집 기간</Label>
        <HelpMessage>시작 날짜와 끝 날짜 순서에 주의</HelpMessage>
        <SApplicationFieldWrapper>
          <SApplicationField>
            <FormController
              name="startDate"
              render={({ field, formState: { errors } }) => {
                const dateError = errors as
                  | {
                      startDate?: FieldError;
                      endDate?: FieldError;
                    }
                  | undefined;
                return (
                  <TextInput
                    placeholder="YYYY.MM.DD"
                    error={
                      dateError?.startDate?.message ||
                      dateError?.endDate?.message
                    }
                    required
                    {...field}
                  />
                );
              }}
            ></FormController>
          </SApplicationField>
          <span style={{ marginTop: '14px' }}>-</span>
          <SApplicationField>
            <FormController
              name="endDate"
              render={({ field }) => (
                <TextInput placeholder="YYYY.MM.DD" {...field} />
              )}
            ></FormController>
          </SApplicationField>
        </SApplicationFieldWrapper>
      </div>

      {/* 모집 인원 */}
      <SMemberCountField>
        <FormController
          name="capacity"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              type="number"
              label="모집 인원"
              placeholder="인원 입력"
              right={
                <span style={{ marginLeft: '10px', color: '#a9a9a9' }}>명</span>
              }
              error={error?.message}
              required
              {...field}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(+e.target.value)
              }
            />
          )}
        ></FormController>
      </SMemberCountField>

      {/* 모임 정보 - 모임 소개 */}
      <div>
        <Label required={true}>모임 정보</Label>
        <Label required={true} size="small">
          모임 소개
        </Label>
        <FormController
          name="detail.desc"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              placeholder="모임 소개"
              maxLength={300}
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </div>

      {/* 모임 정보 - 진행 방식 소개 */}
      <div>
        <Label required={true} size="small">
          진행 방식 소개
        </Label>
        <FormController
          name="detail.processDesc"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              placeholder="진행 방식 소개"
              maxLength={300}
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </div>

      {/* 모임 정보 - 모임 기간 */}
      <div>
        <Label required={true} size="small">
          모임 기간
        </Label>
        <SDateFieldWrapper>
          <SDateField>
            <FormController
              name="detail.mStartDate"
              render={({ field, formState: { errors } }) => {
                const dateError = errors.detail as
                  | (FieldError & {
                      mStartDate?: FieldError;
                      mEndDate?: FieldError;
                    })
                  | undefined;
                return (
                  <TextInput
                    placeholder="YYYY.MM.DD"
                    required
                    error={
                      dateError?.mStartDate?.message ||
                      dateError?.mEndDate?.message
                    }
                    {...field}
                  />
                );
              }}
            ></FormController>
          </SDateField>
          <span style={{ marginTop: '14px' }}>-</span>
          <SDateField>
            <FormController
              name="detail.mEndDate"
              render={({ field }) => (
                <TextInput placeholder="YYYY.MM.DD" {...field} />
              )}
            ></FormController>
          </SDateField>
        </SDateFieldWrapper>
      </div>

      {/* 모임 정보 - 개설자 소개 */}
      <div>
        <Label required={true} size="small">
          개설자 소개
        </Label>
        <FormController
          name="detail.leaderDesc"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              placeholder="개설자 소개"
              maxLength={300}
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </div>

      {/* 모임 정보 - 모집 대상 */}
      <div>
        <Label required={true} size="small">
          모집 대상
        </Label>
        <FormController
          name="detail.targetDesc"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              placeholder="이런 분을 찾습니다."
              maxLength={300}
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </div>

      {/* 모임 정보 - 유의사항 */}
      <div>
        <Label size="small">유의사항</Label>
        <FormController
          name="detail.note"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              placeholder="유의 사항 입력"
              maxLength={300}
              error={error?.message}
              {...field}
            />
          )}
        ></FormController>
      </div>

      {/* TODO: icon이 포함된 컴포넌트를 주입받아야 한다. */}
      <ButtonContainer>
        {cancelButtonLabel && (
          <CancelButton type="button">
            <CancelIcon />
            {cancelButtonLabel}
          </CancelButton>
        )}
        <SubmitButton type="submit">{submitButtonLabel}</SubmitButton>
      </ButtonContainer>
    </SForm>
  );
}

export default Presentation;

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',

  '@mobile': {
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

  '@mobile': {
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

  '@mobile': {
    maxWidth: '151px',
  },
});
const SMemberCountField = styled(SApplicationField);
const SDateFieldWrapper = styled(SApplicationFieldWrapper);
const SDateField = styled(SApplicationField);
const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '20px',
  alignSelf: 'flex-end',

  '@mobile': {
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
  color: '$white',

  '@mobile': {
    gap: '10px',
    width: '100%',
    fontAg: '16_bold_100',
  },
});
const CancelButton = styled(Button, {});
const SubmitButton = styled(Button, {
  background: '$purple100',
});
