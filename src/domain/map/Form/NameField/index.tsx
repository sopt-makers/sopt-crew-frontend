import FormController from '@shared/form/FormController';
import TextInput from '@shared/form/TextInput';
import { styled } from 'stitches.config';

const NameField = () => {
  return (
    <STitleField>
      <FormController
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextInput
            label="장소 이름"
            message="체인점의 경우, 정확한 지점명을 입력해 주세요."
            placeholder="장소 이름"
            maxLength={30}
            required
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </STitleField>
  );
};

const STitleField = styled('div', {
  width: '100%',
});

export default NameField;
