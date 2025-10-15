import { MeetingData } from '@api/meeting/type';
import { useUserApplicationQueryOption } from '@api/user/query';
import { useScrollRestorationAfterLoading } from '@hook/useScrollRestoration';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import Card from '../Card';
import Status from '../Card/Status';
import EmptyView from '../EmptyView';
import GridLayout from '../Grid/Layout';

export function MeetingListOfApplied() {
  const { data: applyData, isLoading } = useQuery(useUserApplicationQueryOption());
  useScrollRestorationAfterLoading(isLoading);

  return (
    <main>
      <SMeetingCount>{applyData?.apply.length}개의 모임</SMeetingCount>
      {applyData?.apply.length ? (
        <GridLayout mobileType="card">
          {applyData?.apply.map(applyData => (
            <Card
              key={applyData.id}
              // TODO: mine meetingData 에 welcomeMessageTypes, meetingKeywordTypes 가 현재 없지만, 곧 서버에서 내려줄 예정
              meetingData={applyData.meeting as unknown as MeetingData}
              mobileType="card"
              bottom={<Status status={applyData.status} />}
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

const SMeetingCount = styled('p', {
  fontStyle: 'H3',
  '@media (max-width: 849px)': {
    width: '380px',
  },
  '@mobile': {
    fontAg: '14_semibold_100',
    width: '100%',
  },
});
