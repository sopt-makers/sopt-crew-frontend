import FormController from '@shared/form/FormController';
import TextInput from '@shared/form/TextInput';
import { ChangeEvent } from 'react';
import { styled } from 'stitches.config';

const MemberCountField = () => {
  return (
    <SMemberCountWrapper>
      <div style={{ width: '119px' }}>
        <FormController
          name="capacity"
          render={({ field }) => (
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
    </SMemberCountWrapper>
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
