import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import CancelIcon from '@assets/svg/x.svg';
import { FieldError, FieldErrors } from 'react-hook-form';
import { styled } from 'stitches.config';
import FileInput from '../FileInput';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import { FlashFormType, MAX_FILE_SIZE } from '@type/form';
import { useRouter } from 'next/router';
import { getPresignedUrl, uploadImage } from '@api/API_LEGACY/meeting';
import { imageS3Bucket } from '@constants/url';
import CalendarInputForm from '../Calendar';
import { Chip, useDialog } from '@sopt-makers/ui';
import ImagePreview from '../Presentation/ImagePreview';
import { flashPlace, flashTags, flashTime } from '@data/options';
import ErrorMessage from '../ErrorMessage';

interface PresentationProps {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  handleChangeImage: (index: number, url: string) => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
  errors: FieldErrors<FlashFormType>;
  placeType?: '오프라인' | '온라인' | '협의 후 결정' | null;
  timeType?: '당일' | '예정 기간 (협의 후 결정)' | null;
}

interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}
interface TypeOptionsProp {
  cancelButtonText?: string;
  approveButtonText?: string;
  buttonFunction?: () => void;
}
interface DialogOptionType {
  title: ReactNode;
  description: ReactNode;
  type?: 'default' | 'danger' | 'single' | undefined;
  typeOptions?: TypeOptionsProp;
}

function Presentation({
  submitButtonLabel,
  cancelButtonLabel,
  handleChangeImage,
  handleDeleteImage,
  onSubmit,
  disabled = true,
  errors,
  placeType = null,
  timeType = null,
}: PresentationProps) {
  const router = useRouter();
  const { open } = useDialog();
  const [placeState, setPlaceState] = useState<'오프라인' | '온라인' | '협의 후 결정' | null>(placeType);
  const [timeState, setTimeState] = useState<'당일' | '예정 기간 (협의 후 결정)' | null>(timeType);
  const isEdit = router.asPath.includes('/edit');

  const formRef = useRef<HTMLFormElement>(null);

  const onChangeFile = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const [file] = [...e.target.files];
    const url = await uploadFile(file ?? new File([], 'default.txt'));
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
      if (filesCount > 1) {
        alert('이미지는 최대 1개까지 업로드 가능합니다.');
        return;
      } else {
        const urls = await Promise.all(newFiles.map(async file => await uploadFile(file)));
        onChange([...imageUrls, ...urls]);
      }
    };

  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const { url, fields } = await getPresignedUrl(extension ?? '');
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const dialogOption: DialogOptionType = {
    title: `번쩍을 ${isEdit ? '수정' : '개설'}하시겠습니까?`,
    description: '번쩍에 대한 설명이 충분히 작성되었는지 확인해 주세요',
    type: 'default',
    typeOptions: {
      cancelButtonText: '취소',
      approveButtonText: `${isEdit ? '수정' : '개설'}하기`,
      buttonFunction: () => {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      },
    },
  };

  return (
    <SForm onSubmit={onSubmit} ref={formRef}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          {/* 번쩍 이름 */}
          <STitleField>
            <FormController
              name="title"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  label="이름"
                  placeholder="번쩍 이름"
                  maxLength={30}
                  required
                  error={error?.message}
                  {...field}
                />
              )}
            ></FormController>
          </STitleField>

          {/* 번쩍 설명 */}
          <div>
            <Label required={true}>설명</Label>
            <FormController
              name="desc"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    placeholder={`ex.\n• 준비물, 공지사항 (ex. 카톡방 초대를 위해 프로필에 전화번호 공개설정 해주세요!)\n• 참여 멤버들간 소통 방법 (ex. 카톡방)\n• 개설자 소개`}
                    maxLength={500}
                    error={error?.message}
                    {...field}
                  />
                </>
              )}
            ></FormController>
          </div>

          {/* 번쩍 일시 */}
          <div>
            <SLabelCheckboxWrapper>
              <SLabelWrapper>
                <Label required={true} size="small">
                  일시
                </Label>
              </SLabelWrapper>
            </SLabelCheckboxWrapper>
            <HelpMessage>
              번쩍 모임 1시간 전, 모집이 자동으로 마감돼요.
              <br />
              Tip) 진행 예정 기간을 정해두고 신청자들과 협의해서 날짜를 정할 수도 있어요.
            </HelpMessage>
            <STargetFieldWrapper>
              <STargetChipContainer>
                <FormController
                  name="timeInfo.time"
                  render={({ field: { value, onChange } }) => (
                    <>
                      {flashTime.map(time => (
                        <Chip
                          active={value.value === time.value}
                          onClick={() => {
                            setTimeState(time.label as '당일' | '예정 기간 (협의 후 결정)');
                            onChange(time);
                          }}
                          key={time.value}
                        >
                          {time.label}
                        </Chip>
                      ))}
                    </>
                  )}
                ></FormController>
              </STargetChipContainer>
            </STargetFieldWrapper>
            <SDateFieldWrapper>
              <SDateField>
                <FormController
                  name="timeInfo.startDate"
                  render={({ field, formState: { errors } }) => {
                    const dateError = errors.detail as
                      | (FieldError & {
                          mStartDate?: FieldError;
                          mEndDate?: FieldError;
                        })
                      | undefined;
                    return (
                      <>
                        {timeState && (
                          <CalendarInputForm
                            selectedDate={field.value}
                            setSelectedDate={field.onChange}
                            error={dateError?.mStartDate?.message || dateError?.mEndDate?.message}
                          />
                        )}
                      </>
                    );
                  }}
                ></FormController>
              </SDateField>
              {timeState === '예정 기간 (협의 후 결정)' && <span style={{ marginTop: '14px' }}>-</span>}
              <SDateField>
                <FormController
                  name="timeInfo.endDate"
                  render={({ field }) => (
                    <>
                      {timeState === '예정 기간 (협의 후 결정)' && (
                        <CalendarInputForm selectedDate={field.value} setSelectedDate={field.onChange} />
                      )}
                    </>
                  )}
                ></FormController>
              </SDateField>
            </SDateFieldWrapper>
          </div>

          {/* 번쩍 장소 */}
          <div>
            <SLabelCheckboxWrapper>
              <SLabelWrapper>
                <Label required={true} size="small">
                  장소
                </Label>
              </SLabelWrapper>
            </SLabelCheckboxWrapper>
            <STargetFieldWrapper>
              <STargetChipContainer>
                <FormController
                  name="placeInfo.place"
                  render={({ field: { value, onChange } }) => (
                    <>
                      {flashPlace.map(place => (
                        <Chip
                          active={value.value === place.value}
                          onClick={() => {
                            setPlaceState(place.label as '오프라인' | '온라인' | '협의 후 결정');
                            onChange(place);
                          }}
                          key={place.value}
                        >
                          {place.label}
                        </Chip>
                      ))}
                    </>
                  )}
                ></FormController>
              </STargetChipContainer>
            </STargetFieldWrapper>

            <STargetFieldWrapper>
              <STargetChipContainer>
                <FormController
                  name="placeInfo.placeDetail"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      {placeState === '오프라인' && (
                        <TextInput placeholder="번쩍 멤버들과 만날 장소" error={error?.message} {...field} />
                      )}
                      {placeState === '온라인' && (
                        <TextInput placeholder="플랫폼, 주소 정보" error={error?.message} {...field} />
                      )}
                    </>
                  )}
                ></FormController>
              </STargetChipContainer>
            </STargetFieldWrapper>
          </div>

          {/* 모집 인원 */}
          <div>
            <SLabelCheckboxWrapper>
              <SLabelWrapper>
                <Label required={true} size="small">
                  모집 인원
                </Label>
              </SLabelWrapper>
            </SLabelCheckboxWrapper>
            <HelpMessage>번쩍이 진행될 수 있는 최소 인원~최대 인원을 입력해주세요 (개설자 제외)</HelpMessage>
            <SPeopleWrapper>
              <FormController
                name="capacityInfo.minCapacity"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    type="number"
                    placeholder="최소 인원"
                    style={{ width: '95px', height: '48px', padding: '11px 16px' }}
                    right={<span style={{ marginLeft: '10px', marginRight: '10px', color: '#a9a9a9' }}>-</span>}
                    required
                    // error={error?.message}
                    {...field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(+e.target.value > 0 && +e.target.value);
                    }}
                    onInput={(event: ChangeEvent<HTMLInputElement>) => {
                      event.target.value = event.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                )}
              ></FormController>
              <FormController
                name="capacityInfo.maxCapacity"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    type="number"
                    placeholder="최대 인원"
                    style={{ width: '95px', height: '48px', padding: '11px 16px' }}
                    right={<span style={{ marginLeft: '10px', color: '#a9a9a9' }}>명</span>}
                    required
                    // error={error?.message}
                    {...field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      field.onChange(+e.target.value > 0 && +e.target.value)
                    }
                    onInput={(event: ChangeEvent<HTMLInputElement>) => {
                      event.target.value = event.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                )}
              ></FormController>
            </SPeopleWrapper>
            {(errors.capacityInfo?.minCapacity || errors.capacityInfo?.maxCapacity) && (
              <SErrorMessage>
                {errors.capacityInfo?.minCapacity?.message || errors.capacityInfo?.maxCapacity?.message}
              </SErrorMessage>
            )}
          </div>

          {/* 번쩍 환영 태그 */}
          <div>
            <SLabelCheckboxWrapper>
              <SLabelWrapper>
                <Label size="small">#환영 태그</Label>
              </SLabelWrapper>
            </SLabelCheckboxWrapper>
            <HelpMessage>
              멤버들이 신청을 주저하지 않도록 환영의 의사를 알려주는건 어떨까요? 최대 3개까지 선택 가능해요.
            </HelpMessage>
            <STargetFieldWrapper>
              <STargetChipContainer>
                <FormController
                  name="welcomeTags"
                  defaultValue={[]}
                  render={({ field: { value = [], onChange } }) => {
                    const selectedTags = Array.isArray(value) ? value : [];
                    return (
                      <>
                        {flashTags.map(tag => {
                          const isActive = selectedTags.some(
                            (selectedTag: { label: string; value: string }) => selectedTag.value === tag.value
                          );
                          return (
                            <Chip
                              active={isActive}
                              onClick={() => {
                                if (isActive) {
                                  onChange(
                                    selectedTags.filter(
                                      (selectedTag: { label: string; value: string }) => selectedTag.value !== tag.value
                                    )
                                  );
                                } else if (selectedTags.length < 3) {
                                  onChange([...selectedTags, tag]);
                                }
                              }}
                              key={tag.value}
                            >
                              {tag.label}
                            </Chip>
                          );
                        })}
                      </>
                    );
                  }}
                ></FormController>
              </STargetChipContainer>
            </STargetFieldWrapper>
          </div>

          {/* 이미지 */}
          <div>
            <Label>소개 이미지</Label>
            <HelpMessage>
              1장만 첨부 가능하며 5MB 이내로 <br />
              가로는 716px, 세로는453px 사이즈를 권장해요
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
                    {/* NOTE: 이미지 개수가 1개 미만일때만 파일 입력 필드를 보여준다. */}
                    <div style={{ display: imageUrls.length < 1 ? 'block' : 'none' }}>
                      <FileInput
                        error={error?.message}
                        onChange={handleAddFiles({ imageUrls, onChange })}
                        onBlur={onBlur}
                      />
                    </div>
                  </>
                )}
              />
            </SFileInputWrapper>
          </div>
        </div>
      </div>
      {/* 모임 정보 끝 */}

      {/* TODO: icon이 포함된 컴포넌트를 주입받아야 한다. */}
      <ButtonContainer>
        {cancelButtonLabel && (
          <CancelButton type="button" onClick={() => router.back()}>
            <CancelIcon />
            {cancelButtonLabel}
          </CancelButton>
        )}
        <SubmitButton
          type="button"
          onClick={() => {
            open(dialogOption);
          }}
          disabled={disabled}
        >
          {submitButtonLabel}
        </SubmitButton>
      </ButtonContainer>
    </SForm>
  );
}

export default Presentation;

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
  '@tablet': {
    gap: '56px',
  },
});
const STitleField = styled('div', {
  width: '100%',
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
  color: '$gray500',
  gap: '12px',
});
const SApplicationField = styled('div', {
  width: '100%',
  maxWidth: '205px',

  '@tablet': {
    maxWidth: '151px',
  },
});
const SDateFieldWrapper = styled(SApplicationFieldWrapper);
const SDateField = styled(SApplicationField);
const STargetFieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$16',
  marginBottom: '16px',
});

const STargetChipContainer = styled('div', {
  display: 'flex',
  gap: '$10',
  flexWrap: 'wrap',

  '@media(max-width: 430px)': {
    maxWidth: '320px',
  },
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
  background: '$gray600',
  borderRadius: '10px',
  fontAg: '18_bold_100',
  color: '$gray10',

  '@tablet': {
    gap: '10px',
    width: '100%',
    fontAg: '16_bold_100',
  },
});
const CancelButton = styled(Button, {});
const SubmitButton = styled(Button, {
  background: '$gray10',
  color: '$gray950',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.35,
  },
});

const SLabelWrapper = styled('div', {
  width: 'fit-content',
});

const SLabelCheckboxWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const SPeopleWrapper = styled('div', {
  display: 'flex',

  '& > div': {
    width: 'fit-content',
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
