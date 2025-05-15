import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import CoLeader from '@components/form/Presentation/CoLeaderField/CoLeader';

const CoLeaderField = () => {
  return (
    <>
      <Label size="small">공동 모임장</Label>
      <HelpMessage>
        공동 모임장은 총 3명까지 등록 가능해요. 플레이그라운드에서의 모임 관리/편집은 모임 개설자만 가능해요.
      </HelpMessage>
      <FormController
        name="detail.coLeader"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return <CoLeader value={value} onChange={onChange} error={error?.message} />;
        }}
      ></FormController>
    </>
  );
};

export default CoLeaderField;
