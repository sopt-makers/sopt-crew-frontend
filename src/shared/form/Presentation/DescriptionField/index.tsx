import FormController from '@shared/form/FormController';
import Label from '@shared/form/Label';
import Textarea from '@shared/form/Textarea';

const DescriptionField = () => {
  return (
    <div>
      <Label required={true}>모임 소개</Label>
      <FormController
        name="detail.desc"
        render={({ field, fieldState: { error } }) => (
          <Textarea
            placeholder={`ex.\n• 모임 성격\n• 모임 개설 배경/목적\n• 모임의 효능`}
            maxLength={1000}
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </div>
  );
};

export default DescriptionField;
