import CheckSelectedIcon from '@assets/svg/checkBox/form_selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/form_unselected.svg';
import CancelIcon from '@assets/svg/x.svg';
import CategoryField from '@components/form/Presentation/CategoryField';
import ImageField from '@components/form/Presentation/ImageField';
import useImageHandler from '@components/form/Presentation/ImageField/useImageHandler';
import JoinablePartsField from '@components/form/Presentation/JoinablePartsField';
import KeywordField from '@components/form/Presentation/KeywordField';
import TitleField from '@components/form/Presentation/TitleField';
import WelcomeMessageField from '@components/form/Presentation/WelcomeMessageField';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { useDialog } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactNode, useRef } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { styled } from 'stitches.config';
import CalendarInputForm from '../Calendar';
import NeedMentor from '../CheckBox/NeedMentor';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Textarea from '../Textarea';
import TextInput from '../TextInput';
import ActivityPeriodField from './ActivityPeriodField';
import CoLeader from './CoLeader';
import DescriptionField from './DescriptionField';
import ProcessIntroductionField from './ProcessIntroductionField';
interface PresentationProps {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  handleChangeImage: (index: number, url: string) => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
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
  const { handleChangeFile, handleDeleteFile, handleAddFiles } = useImageHandler({
    onChangeImage: handleChangeImage,
    onDeleteImage: handleDeleteImage,
  });

  const isEdit = router.asPath.includes('/edit');

  const formRef = useRef<HTMLFormElement>(null);

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
        <SFormSectionDivider>1. 모임 정보</SFormSectionDivider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          <TitleField />
          <CategoryField />
          <KeywordField />
          <ImageField onChangeFile={handleChangeFile} onDeleteFile={handleDeleteFile} onAddFiles={handleAddFiles} />
          <DescriptionField />
        </div>
      </div>
      <div>
        <SFormSectionDivider>2. 활동 정보</SFormSectionDivider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          <ActivityPeriodField />
          <ProcessIntroductionField />
          {/* 활동 정보 끝 */}
          <div>
            <SFormSectionDivider>3. 모집 정보</SFormSectionDivider>
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
            <SFormSectionDivider>4. 추가 정보</SFormSectionDivider>
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

          {/* 추가 정보 - 환영 태그*/}
          <WelcomeMessageField />

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
          <Button type="button" onClick={() => router.back()}>
            <CancelIcon />
            {cancelButtonLabel}
          </Button>
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
const SubmitButton = styled(Button, {
  background: '$gray10',
  color: '$gray950',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.35,
  },
});

const SFormSectionDivider = styled('div', {
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
