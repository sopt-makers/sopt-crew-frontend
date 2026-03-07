import FormController from '@shared/form/FormController';
import Label from '@shared/form/Label';
import Textarea from '@shared/form/Textarea';

const DescriptionField = () => {
  return (
    <div>
      <Label required={true}>한줄 소개</Label>
      <FormController
        name="description"
        render={({ field, fieldState: { error } }) => (
          <Textarea
            placeholder={`ex.\n• 모든 자리에 콘센트가 있어요.\n• 화장실이 깨끗해요.`}
            maxLength={80}
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </div>
  );
};

export default DescriptionField;
