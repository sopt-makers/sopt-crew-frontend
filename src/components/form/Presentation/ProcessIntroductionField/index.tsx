import FormController from '@components/form/FormController';
import Label from '@components/form/Label';
import Textarea from '@components/form/Textarea';

const ProcessIntroductionField = () => {
  return (
    <div>
      <Label required={true} size="small">
        진행 방식 소개
      </Label>
      <FormController
        name="detail.processDesc"
        render={({ field, fieldState: { error } }) => (
          <Textarea
            placeholder={`ex.\n• 활동 방법\n• 커리큘럼\n• 모임 내 소통 방식`}
            maxLength={1000}
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </div>
  );
};

export default ProcessIntroductionField;
