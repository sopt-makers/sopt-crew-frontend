import FormController from '@components/form/FormController';
import TextInput from '@components/form/TextInput';
import { styled } from 'stitches.config';

const TitleField = () => {
  return (
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
  );
};

export default TitleField;

const STitleField = styled('div', {
  width: '100%',
});
