import CheckSelectedIcon from '@assets/svg/checkBox/form_selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/form_unselected.svg';
import FormController from '@components/form/FormController';
import TextInput from '@components/form/TextInput';
import { fontsObject } from '@sopt-makers/fonts';
import { ChangeEvent } from 'react';
import { styled } from 'stitches.config';

const MemberCountField = () => {
  return (
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(+e.target.value > 0 && +e.target.value)}
            />
          )}
        ></FormController>
      </div>
      <OnlyActiveGenerationField />
    </SMemberCountWrapper>
  );
};

const OnlyActiveGenerationField = () => {
  return (
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
  );
};

export default MemberCountField;

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
