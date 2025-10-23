import { MeetingData } from '@api/meeting/type';
import { useUserMeetingListQueryOption } from '@api/user/query';
import { useScrollRestorationAfterLoading } from '@hook/useScrollRestoration';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import Card from '../Card';
import ManagementButton from '../Card/ManagementButton';
import CardSkeleton from '../Card/Skeleton';
import EmptyView from '../EmptyView';
import GridLayout from '../Grid/Layout';

function MeetingListOfMine() {
  const { data: mineData, isLoading } = useSuspenseQuery(useUserMeetingListQueryOption());
  useScrollRestorationAfterLoading(isLoading);

  return (
    <main style={{ marginBottom: '20%' }}>
      <SMeetingCount>{mineData?.meetings.length}개의 모임</SMeetingCount>
      {mineData?.meetings.length ? (
        <GridLayout mobileType="card">
          {mineData?.meetings.map(meetingData => (
            <Card
              key={meetingData.id}
              // TODO: mine meetingData 에 welcomeMessageTypes, meetingKeywordTypes 가 현재 없지만, 곧 서버에서 내려줄 예정
              meetingData={meetingData as unknown as MeetingData}
              mobileType="card"
              bottom={
                meetingData?.isCoLeader ? (
                  <SBlankManageMentButton></SBlankManageMentButton>
                ) : (
                  <ManagementButton id={meetingData.id} />
                )
              }
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

export default () => {
  return (
    <Suspense
      fallback={
        <GridLayout mobileType="card">
          {new Array(6).fill(null).map((_, index) => (
            <CardSkeleton key={index} mobileType="card" />
          ))}
        </GridLayout>
      }
    >
      <MeetingListOfMine />
    </Suspense>
  );
};

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

const SBlankManageMentButton = styled('div', {
  width: '128px',
  padding: '12px 12px 13px 14px',
  borderRadius: '71px',
  fontAg: '16_bold_100',
  whiteSpace: 'nowrap',
  //background: '$gray800',
  '@media (max-width: 768px)': {
    width: '91px',
    //todo: 참여자 리스트 버튼으로 바꾸기
    height: '30px',
    marginTop: '16px',
    fontStyle: 'T6',
    padding: '6px 6px 6px 12px',
  },
});
