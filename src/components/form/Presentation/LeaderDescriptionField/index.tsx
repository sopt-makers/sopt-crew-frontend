import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import NeedMentor from '@components/form/Presentation/LeaderDescriptionField/NeedMentor';
import Textarea from '@components/form/Textarea';
import { styled } from 'stitches.config';

const LeaderDescriptionField = () => {
  return (
    <div>
      <Label size="small">모임장 소개</Label>
      <SNeedMentorFieldWrapper>
        <HelpMessage>멘토가 필요하다면 '멘토 구해요'를 체크해주세요</HelpMessage>
        <FormController
          name="detail.isMentorNeeded"
          defaultValue={false}
          render={({ field }) => <NeedMentor {...field} />}
        ></FormController>
      </SNeedMentorFieldWrapper>
      <FormController
        name="detail.leaderDesc"
        render={({ field, fieldState: { error } }) => (
          <Textarea
            placeholder={`ex.\n• 모임장 연락망\n• 모임장의 tmi(모임과 관련 있으면 더 좋아요!)`}
            maxLength={1000}
            error={error?.message}
            {...field}
          />
        )}
      ></FormController>
    </div>
  );
};

export default LeaderDescriptionField;

const SNeedMentorFieldWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  '@media(max-width: 385px)': {
    flexDirection: 'column',
    marginBottom: '$18',
  },
});
