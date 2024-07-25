import { useQueryMeetingListOfAll } from '@api/API_LEGACY/meeting/hooks';
import { useQueryMeetingListOfApplied, useQueryMeetingListOfMine } from '@api/API_LEGACY/user/hooks';
import { usePageParams } from '@hooks/queryString/custom';
import { useScrollRestorationAfterLoading } from '@hooks/useScrollRestoration';
import { styled } from 'stitches.config';
import Card from '../Card';
import ManagementButton from '../Card/ManagementButton';
import Status from '../Card/Status';
import EmptyView from '../EmptyView';
import Pagination from '../Pagination';
import GridLayout from './Layout';

export function MeetingListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { data: meetingListData, isLoading } = useQueryMeetingListOfAll();
  useScrollRestorationAfterLoading(isLoading);

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

          <PaginationWrapper>
            <Pagination
              totalPagesLength={meetingListData?.meta.pageCount}
              currentPageIndex={Number(page)}
              changeCurrentPage={setPage}
            />
          </PaginationWrapper>
        </>
      ) : (
        <EmptyView message="검색 결과가 없습니다." />
      )}
    </main>
  );
}
const PaginationWrapper = styled('div', {
  my: '$80',
});

export function MeetingListOfMine() {
  const { data: mineData, isLoading } = useQueryMeetingListOfMine();
  useScrollRestorationAfterLoading(isLoading);
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
  const { data: applyData, isLoading } = useQueryMeetingListOfApplied();
  useScrollRestorationAfterLoading(isLoading);

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
