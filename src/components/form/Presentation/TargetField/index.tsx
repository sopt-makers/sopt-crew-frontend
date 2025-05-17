import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import JoinablePartsField from '@components/form/Presentation/JoinablePartsField';
import MemberCountField from '@components/form/Presentation/TargetField/MemberCountField';
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
              <MemberCountField />
            </STargetFieldWrapper>
          );
        }}
      ></FormController>
    </div>
  );
};

export default TargetField;

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
