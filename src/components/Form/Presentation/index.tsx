import React, { ChangeEvent } from 'react';
import { categories } from 'src/data/categories';
import { styled } from 'stitches.config';
import FormController from '../FormController';
import HelpMessage from '../HelpMessage';
import Label from '../Label';
import Select from '../Select';
import Textarea from '../Textarea';
import TextInput from '../TextInput';

interface PresentationProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
}

function Presentation({
  onSubmit,
  submitButtonLabel,
  cancelButtonLabel,
}: PresentationProps) {
  return (
    <SForm onSubmit={onSubmit}>
      {/* 모임 제목 */}
      <STitleField>
        <FormController
          name="title"
          render={({ field }) => (
            <TextInput
              label="모임 제목"
              message="최대 30자 이내로 입력"
              placeholder="제목 입력"
              required
              {...field}
            />
          )}
        ></FormController>
      </STitleField>

      {/* 모임 카테고리 */}
      <FormController
        name="category"
        defaultValue={categories[0]}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            label="모임 카테고리"
            options={categories}
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      ></FormController>

      {/* TODO: 이미지 */}

      {/* 모집 기간 */}
      <div>
        <Label required={true}>모집 기간</Label>
        <HelpMessage>최대 6개까지 첨부 가능, 이미지 사이즈 제약</HelpMessage>
        <SApplicationFieldWrapper>
          <SApplicationField>
            <FormController
              name="startDate"
              render={({ field }) => (
                <TextInput placeholder="YYYY.MM.DD" required {...field} />
              )}
            ></FormController>
          </SApplicationField>
          -
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
          render={({ field }) => (
            <TextInput
              type="number"
              label="모집 인원"
              placeholder="인원 입력"
              right={
                <span style={{ marginLeft: '10px', color: '#a9a9a9' }}>명</span>
              }
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
          render={({ field }) => (
            <Textarea placeholder="모임 소개" maxLength={500} {...field} />
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
          render={({ field }) => (
            <Textarea placeholder="진행 방식 소개" maxLength={500} {...field} />
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
              render={({ field }) => (
                <TextInput placeholder="YYYY.MM.DD" required {...field} />
              )}
            ></FormController>
          </SDateField>
          -
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
          render={({ field }) => (
            <Textarea placeholder="개설자 소개" maxLength={500} {...field} />
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
          render={({ field }) => (
            <Textarea
              placeholder="이런 분을 찾습니다."
              maxLength={300}
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
          render={({ field }) => (
            <Textarea placeholder="유의 사항 입력" maxLength={500} {...field} />
          )}
        ></FormController>
      </div>

      {/* TODO: icon이 포함된 컴포넌트를 주입받아야 한다. */}
      <ButtonContainer>
        {cancelButtonLabel && <CancelButton>{cancelButtonLabel}</CancelButton>}
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
});
const STitleField = styled('div', {
  width: '369px',
});
const SApplicationFieldWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$gray100',
  gap: '12px',
});
const SApplicationField = styled('div', {
  width: '205px',
});
const SMemberCountField = styled(SApplicationField);
const SDateFieldWrapper = styled(SApplicationFieldWrapper);
const SDateField = styled(SApplicationField);
const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '20px',
  alignSelf: 'flex-end',
});
const Button = styled('button', {
  padding: '16px 20px',
  flexType: 'verticalCenter',
  gap: '12px',
  background: '$black40',
  borderRadius: '10px',
  fontAg: '18_bold_100',
  color: '$white',
});
const CancelButton = styled(Button, {});
const SubmitButton = styled(Button, {
  background: '$purple100',
});
