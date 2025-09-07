import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import JoinablePartsField from '@shared/form/Presentation/JoinablePartsField';
import MemberCountField from '@shared/form/Presentation/TargetField/MemberCountField';
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
        render={() => {
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
