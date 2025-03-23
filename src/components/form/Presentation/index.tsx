import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import CancelIcon from '@assets/svg/x.svg';
import { FieldError, FieldErrors } from 'react-hook-form';
import { categories } from '@data/categories';
import { styled } from 'stitches.config';
import FileInput from '../FileInput';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Select from '../Select';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import ImagePreview from './ImagePreview';
import { MAX_FILE_SIZE } from '@type/form';
import NeedMentor from '../CheckBox/NeedMentor';
import { useRouter } from 'next/router';
import { getPresignedUrl, uploadImage } from '@api/API_LEGACY/meeting';
import { imageS3Bucket } from '@constants/url';
import CalendarInputForm from '../Calendar';
import { fontsObject } from '@sopt-makers/fonts';
import { colors } from '@sopt-makers/colors';
import CheckSelectedIcon from '@assets/svg/checkBox/form_selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/form_unselected.svg';
import { IconAlertCircle } from '@sopt-makers/icons';
import { useDialog } from '@sopt-makers/ui';
import sopt_schedule_tooltip from '@assets/images/sopt_schedule_tooltip.png';
import BubblePointIcon from '@assets/svg/bubble_point.svg';
import JoinablePartsField from '@components/form/Presentation/JoinablePartsField';
import CoLeader from './CoLeader';

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
}: PresentationProps) {
  const router = useRouter();
  const { open } = useDialog();
  const [isSoptScheduleOpen, setIsSoptScheduleOpen] = useState(false);
  const soptScheduleRef = useRef<HTMLDivElement | null>(null);
  const isEdit = router.asPath.includes('/edit');

  const schedule: React.ReactNode = (
    <>
      • 1~8차 세미나 <br />
      &nbsp;&nbsp;&nbsp;2024.10.05 ~ 2024.12.28 <br />
      • 1차 행사 <br />
      &nbsp;&nbsp;&nbsp;2024.11.09 <br />
      • 솝커톤 <br />
      &nbsp;&nbsp;&nbsp;2024.11.23 ~ 2024.11.24 <br />
      • 기획 경선 <br />
      &nbsp;&nbsp;&nbsp;2024.12.14 <br />
      • 2차 행사 <br />
      &nbsp;&nbsp;&nbsp;2024.12.07 <br />
      • 앱잼 <br />
      &nbsp;&nbsp;&nbsp;2024.12.21 ~ 2025.01.25
    </>
  );

  const soptScheduledialogOption: DialogOptionType = {
    title: 'SOPT 공식 일정',
    description: schedule,
    type: 'default',
  };

  const handleSoptScheduleOpen = (isOpen: boolean) => {
    window.innerWidth <= 768 ? open(soptScheduledialogOption) : setIsSoptScheduleOpen(isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (soptScheduleRef.current && !soptScheduleRef.current.contains(event.target as Node)) {
        setIsSoptScheduleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [soptScheduleRef]);

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
    const { url, fields } = await getPresignedUrl(extension ?? '');
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const dialogOption: DialogOptionType = {
    title: `모임을 ${isEdit ? '수정' : '개설'}하시겠습니까?`,
    description: '모임에 대한 설명이 충분히 작성되었는지 확인해 주세요',
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
        <SFormSectionDevider>1. 모임 정보</SFormSectionDevider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          {/* 모임 제목 */}
          <STitleField>
            <FormController
              name="title"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  label="모임 이름"
                  placeholder="모임 이름"
                  maxLength={30}
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
              const error = (fieldState.error as (FieldError & { value: FieldError }) | undefined)?.value;
              return (
                <div style={{ width: '260px' }}>
                  <Select
                    label="모임 카테고리"
                    options={categories}
                    required
                    error={error?.message}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </div>
              );
            }}
          ></FormController>

          {/* 이미지 */}
          <div>
            <Label required={true}>소개 이미지</Label>
            <HelpMessage>
              6개까지 첨부 가능하며 5MB 이내로 <br />
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
                    {/* NOTE: 이미지 개수가 6개 미만일때만 파일 입력 필드를 보여준다. */}
                    <div style={{ display: imageUrls.length < 6 ? 'block' : 'none' }}>
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

          {/* 모임 소개 */}
          <div>
            <Label required={true}>모임 소개</Label>
            <FormController
              name="detail.desc"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    placeholder={`ex.\n• 모임 성격\n• 모임 개설 배경/목적\n• 모임의 효능`}
                    maxLength={1000}
                    error={error?.message}
                    {...field}
                  />
                  {/* <TextField
                    labelText="모임 소개"
                    placeholder={`ex.\n• 모임 성격\n</br>• 모임 개설 배경/목적\n• 모임의 효능`}
                    required
                    style={TextFieldStyle}
                    maxLength={1000}
                    {...field}
                  /> */}
                </>
              )}
            ></FormController>
          </div>
        </div>
      </div>
      {/* 모임 정보 끝 */}

      <div>
        <SFormSectionDevider>2. 활동 정보</SFormSectionDevider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          {/* 활동 정보 - 모임 기간 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Label required={true} size="small">
                활동 기간
              </Label>
              <div
                ref={soptScheduleRef}
                style={{ display: 'flex', gap: '4px', position: 'relative' }}
                onMouseEnter={() => handleSoptScheduleOpen(true)}
                onMouseLeave={() => handleSoptScheduleOpen(false)}
              >
                <div style={{ display: 'flex', gap: '4px', marginRight: '16px' }}>
                  <SoptNotice>SOPT 공식 일정 확인하기</SoptNotice>
                  <IconAlertCircle style={{ width: '16px', height: '16px', color: 'gray', cursor: 'pointer' }} />
                </div>
                {isSoptScheduleOpen && (
                  <ToolTipDiv>
                    <Pointdiv>
                      <BubblePoint />
                    </Pointdiv>
                    <TextDiv>
                      <div>• 1~8차 세미나: 2024.10.05 ~ 2024.12.28</div>
                      <div>• 1차 행사: 2024.11.09</div>
                      <div>• 솝커톤: 2024.11.23 ~2024.11.24</div>
                      <div>• 기획 경선: 2024.12.14</div>
                      <div>• 2차 행사: 2024.12.12</div>
                      <div>• 앱잼: 2024.12.21 ~ 2025.01.25</div>
                    </TextDiv>
                  </ToolTipDiv>
                )}
              </div>
            </div>
            <SDateFieldWrapper>
              <SDateField>
                <FormController
                  name="detail.mDateRange"
                  render={({ field, formState: { errors } }) => {
                    const dateError = errors.detail as
                      | (FieldError & {
                          mDateRange?: FieldError[];
                        })
                      | undefined;
                    return (
                      <CalendarInputForm
                        selectedDate={field.value}
                        setSelectedDate={field.onChange}
                        selectedDateFieldName={field.name}
                        error={
                          (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                          (dateError?.mDateRange as FieldError[])?.[1]?.message
                        }
                        dateType="startDate"
                      />
                    );
                  }}
                ></FormController>
              </SDateField>
              <span style={{ marginTop: '14px' }}>-</span>
              <SDateField>
                <FormController
                  name="detail.mDateRange"
                  render={({ field, formState: { errors } }) => {
                    const dateError = errors.detail as
                      | (FieldError & {
                          mDateRange?: FieldError[];
                        })
                      | undefined;

                    return (
                      <CalendarInputForm
                        selectedDate={field.value}
                        setSelectedDate={field.onChange}
                        dateType="endDate"
                        error={
                          (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                          (dateError?.mDateRange as FieldError[])?.[1]?.message
                        }
                        selectedDateFieldName={field.name}
                      />
                    );
                  }}
                ></FormController>
              </SDateField>
            </SDateFieldWrapper>
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
                  placeholder={`ex.\n• 활동 방법\n• 커리큘럼\n• 모임 내 소통 방식`}
                  maxLength={1000}
                  error={error?.message}
                  {...field}
                />
              )}
            ></FormController>
          </div>
          {/* 활동 정보 끝 */}
          <div>
            <SFormSectionDevider>3. 모집 정보</SFormSectionDevider>
            <SectionLine />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
              {/* 모집 기간 */}
              <div>
                <Label required={true}>신청 기간</Label>
                <HelpMessage>설정한 신청 기간 시작일의 자정(AM 12:00)에 '신청하기' 버튼이 활성화돼요</HelpMessage>
                <SApplicationFieldWrapper>
                  <SApplicationField>
                    <FormController
                      name="dateRange"
                      render={({ field, formState: { errors } }) => {
                        const dateError = errors as
                          | {
                              dateRange?: FieldError[];
                            }
                          | undefined;
                        return (
                          <CalendarInputForm
                            selectedDate={field.value}
                            setSelectedDate={field.onChange}
                            selectedDateFieldName={field.name}
                            error={
                              (dateError?.dateRange as FieldError[])?.[0]?.message ||
                              (dateError?.dateRange as FieldError[])?.[1]?.message
                            }
                            dateType="startDate"
                          />
                        );
                      }}
                    ></FormController>
                  </SApplicationField>
                  <span style={{ marginTop: '14px' }}>-</span>
                  <SApplicationField>
                    <FormController
                      name="dateRange"
                      render={({ field }) => (
                        <CalendarInputForm
                          selectedDate={field.value}
                          setSelectedDate={field.onChange}
                          selectedDateFieldName={field.name}
                          dateType="endDate"
                        />
                      )}
                    ></FormController>
                  </SApplicationField>
                </SApplicationFieldWrapper>
              </div>

              {/* 모임 정보 - 모집 대상 / 대상 파트 / 대상 기수 */}
              <div>
                <SLabelCheckboxWrapper>
                  <SLabelWrapper>
                    <Label required={true} size="small">
                      모집 대상
                    </Label>
                  </SLabelWrapper>
                </SLabelCheckboxWrapper>
                <HelpMessage>모임장을 제외한 인원 수를 입력해주세요</HelpMessage>
                <FormController
                  name="detail.targetDesc"
                  render={({ field, formState: { errors }, fieldState: { error: targetDescError } }) => {
                    const detailError = errors.detail as FieldErrors | undefined;
                    const joinablePartsError = detailError?.joinableParts as FieldError;
                    const errorMessage = () => {
                      if (targetDescError) {
                        if (joinablePartsError) {
                          return '대상 파트를 선택하고 상세 내용을 작성해주세요.';
                        }
                        return targetDescError.message;
                      }
                      if (joinablePartsError) {
                        return joinablePartsError.message;
                      }
                    };
                    return (
                      <STargetFieldWrapper>
                        <STargetChipContainer>
                          <FormController
                            name="detail.joinableParts"
                            render={({ field: { value, onChange } }) => (
                              <JoinablePartsField value={value} onChange={onChange} />
                            )}
                          ></FormController>
                        </STargetChipContainer>
                        {/* 모집 인원 */}
                        <SMemberCountWrapper>
                          <div style={{ width: '119px' }}>
                            <FormController
                              name="capacity"
                              render={({ field, fieldState: { error } }) => (
                                <TextInput
                                  type="number"
                                  placeholder="총 인원 수"
                                  style={{ width: '95px', height: '48px', padding: '11px 16px' }}
                                  right={<span style={{ marginLeft: '10px', color: '#a9a9a9' }}>명</span>}
                                  required
                                  {...field}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    field.onChange(+e.target.value > 0 && +e.target.value)
                                  }
                                />
                              )}
                            ></FormController>
                          </div>

                          <FormController
                            name="detail.canJoinOnlyActiveGeneration"
                            defaultValue={false}
                            render={({ field: { value, onChange } }) => (
                              <SFormCheckBox active={value} onClick={() => onChange(!value)}>
                                {value ? (
                                  <CheckSelectedIcon style={{ marginRight: '8px' }} />
                                ) : (
                                  <CheckUnselectedIcon style={{ marginRight: '8px' }} />
                                )}
                                활동 기수만
                              </SFormCheckBox>
                            )}
                          ></FormController>
                        </SMemberCountWrapper>
                      </STargetFieldWrapper>
                    );
                  }}
                ></FormController>
              </div>
            </div>
          </div>
          {/* 모집 정보 끝 */}

          {/* 추가 정보 - 공동 모임장 */}
          <div>
            <SFormSectionDevider>4. 추가 정보</SFormSectionDevider>
            <SectionLine />
            <Label size="small">공동 모임장</Label>
            <HelpMessage>
              공동 모임장은 총 3명까지 등록 가능해요. 플레이그라운드에서의 모임 관리/편집은 모임 개설자만 가능해요.
            </HelpMessage>

            <FormController
              name="detail.coLeader"
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return <CoLeader value={value} onChange={onChange} error={error?.message} />;
              }}
            ></FormController>
          </div>

          {/* 추가 정보 - 모임장 소개 */}
          <div>
            <Label size="small">모임장 소개</Label>

            <SNeedMentorFieldWrapper>
              <HelpMessage>멘토가 필요하다면 '멘토 구해요'를 체크해주세요</HelpMessage>
              <FormController
                name="detail.isMentorNeeded"
                defaultValue={false}
                render={({ field }) => <NeedMentor {...field} />}
              ></FormController>
            </SNeedMentorFieldWrapper>
            <FormController
              name="detail.leaderDesc"
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  placeholder={`ex.\n• 모임장 연락망\n• 모임장의 tmi(모임과 관련 있으면 더 좋아요!)`}
                  maxLength={1000}
                  error={error?.message}
                  {...field}
                />
              )}
            ></FormController>
          </div>

          {/* 추가 정보 - 유의사항 */}
          <div>
            <Label size="small">유의사항</Label>
            <FormController
              name="detail.note"
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  placeholder={`ex.\n• 신청 전 알아두어야 할 공지`}
                  maxLength={1000}
                  error={error?.message}
                  {...field}
                />
              )}
            ></FormController>
          </div>
        </div>
      </div>
      {/* 활동 정보 끝 */}

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
  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
    maxWidth: '151px',
  },
});
const SDateFieldWrapper = styled(SApplicationFieldWrapper);
const SDateField = styled(SApplicationField);
const SNeedMentorFieldWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  '@media(max-width: 385px)': {
    flexDirection: 'column',
    marginBottom: '$18',
  },
});
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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

const SFormSectionDevider = styled('div', {
  ...fontsObject.HEADING_4_24_B,
  paddingBottom: '12px',
  display: 'flex',
  alignItems: 'center',
});

const SectionLine = styled('div', {
  width: '100%',
  height: '1px',
  background: `${colors.gray800}`,
  mb: '$20',
});

const SSectionCountBox = styled('div', {
  ...fontsObject.LABEL_4_12_SB,
  width: '50px',
  height: '24px',
  padding: '6px 0px',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '6px',
  ml: '$10',
  background: `${colors.gray700}`,
  color: `${colors.white}`,
});

const SMemberCountWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '227px',
  height: '48px',
});

const SFormCheckBox = styled('div', {
  ...fontsObject.BODY_3_14_R,
  display: 'flex',
  alignItems: 'center',
  color: '$gray300',
  variants: {
    active: {
      true: { color: '$gray10' },
    },
  },
  cursor: 'pointer',
});

const SLabelWrapper = styled('div', {
  width: 'fit-content',
});

const SLabelCheckboxWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const ImageHelpMessage = styled('div', {
  marginBottom: '18px',
  fontAg: '14_medium_100',
  color: '$gray500',
});

const SoptNotice = styled('span', {
  cursor: 'pointer',
  display: 'inline-block',
  minWidth: '$125',
  ...fontsObject.LABEL_4_12_SB,
  color: '$gray300',
});

const ToolTipDiv = styled('div', {
  width: '252px',
  height: '162px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  position: 'absolute',
  top: '$20',
  right: '$0',
  isolate: 'isolation',
});

const Pointdiv = styled('div', {
  display: 'inline-flex',
  paddingRight: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const BubblePoint = styled(BubblePointIcon);

const TextDiv = styled('div', {
  display: 'inline-flex',
  padding: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4px',

  borderRadius: '10px',
  backgroundColor: '$gray600',

  color: '$gray50',
  ...fontsObject.LABEL_4_12_SB,
});

const SoptScheduleDiv = styled('div', {
  position: 'absolute',
  top: '$20',
  right: '$0',
  isolate: 'isolation',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$4',

  color: '$gray100',
  ...fontsObject.LABEL_4_12_SB,

  padding: '$16',
  paddingTop: '$32',

  width: '252px',
  height: '162px', //148 + 16
  backgroundImage: `url(${sopt_schedule_tooltip.src})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});
