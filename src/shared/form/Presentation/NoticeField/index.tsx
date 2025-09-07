import FormController from '@shared/form/FormController';
import Label from '@shared/form/Label';
import Textarea from '@shared/form/Textarea';

const NoticeField = () => {
  return (
    <div>
      <Label size="small">유의사항</Label>
      <FormController
        name="detail.note"
        render={({ field, fieldState: { error } }) => (
          <Textarea
            placeholder={`ex.\n• 신청 전 알아두어야 할 공지`}
            maxLength={1000}
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </div>
  );
};

export default NoticeField;
