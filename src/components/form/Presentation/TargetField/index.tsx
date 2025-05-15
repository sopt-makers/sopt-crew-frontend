import CheckSelectedIcon from '@assets/svg/checkBox/form_selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/form_unselected.svg';
import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import JoinablePartsField from '@components/form/Presentation/JoinablePartsField';
import TextInput from '@components/form/TextInput';
import { fontsObject } from '@sopt-makers/fonts';
import { ChangeEvent } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { styled } from 'stitches.config';

const TargetField = () => {
  return (
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
                  render={({ field: { value, onChange } }) => <JoinablePartsField value={value} onChange={onChange} />}
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
  );
};

export default TargetField;

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

const SMemberCountWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '227px',
  height: '48px',
});
