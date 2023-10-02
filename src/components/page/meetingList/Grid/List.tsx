import { usePageParams } from '@hooks/queryString/custom';
import { useQueryMeetingListOfAll } from '@api/meeting/hooks';
import { useQueryMeetingListOfApplied, useQueryMeetingListOfMine } from '@api/user/hooks';
import { styled } from 'stitches.config';
import Card from '../Card';
import ManagementButton from '../Card/ManagementButton';
import Status from '../Card/Status';
import EmptyView from '../EmptyView';
import Pagination from '../Pagination';
import GridLayout from './Layout';

export function MeetingListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { data: meetingListData } = useQueryMeetingListOfAll();

  return (
    <main>
      <SMeetingCount>{meetingListData?.meta.itemCount}개의 모임</SMeetingCount>
      {meetingListData?.meetings.length ? (
        <>
          <GridLayout mobileType="list">
            {meetingListData?.meetings.map(meetingData => (
              <Card key={meetingData.id} meetingData={meetingData} mobileType="list" />
            ))}
          </GridLayout>

          <Box css={{ my: '$80' }}>
            <Pagination
              totalPagesLength={meetingListData?.meta.pageCount}
              currentPageIndex={Number(page)}
              changeCurrentPage={setPage}
            />
          </Box>
        </>
      ) : (
        <EmptyView message="검색 결과가 없습니다." />
      )}
    </main>
  );
}

export function MeetingListOfMine() {
  const { data: mineData } = useQueryMeetingListOfMine();

  return (
    <main>
      <SMeetingCount>{mineData?.meetings.length}개의 모임</SMeetingCount>
      {mineData?.meetings.length ? (
        <GridLayout mobileType="card">
          {mineData?.meetings.map(meetingData => (
            <Card
              key={meetingData.id}
              meetingData={meetingData}
              mobileType="card"
              bottom={<ManagementButton id={meetingData.id} />}
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

export function MeetingListOfApplied() {
  const { data: applyData } = useQueryMeetingListOfApplied();

  return (
    <main>
      <SMeetingCount>{applyData?.apply.length}개의 모임</SMeetingCount>
      {applyData?.apply.length ? (
        <GridLayout mobileType="card">
          {applyData?.apply.map(applyData => (
            <Card
              key={applyData.id}
              meetingData={applyData.meeting}
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
  '@tablet': {
    fontAg: '12_semibold_100',
  },
});
