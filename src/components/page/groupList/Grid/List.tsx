import { Box } from '@components/box/Box';
import { usePageParams } from '@hooks/queryString/custom';
import { useQueryGroupListOfAll } from 'src/api/meeting/hooks';
import {
  useQueryGroupListOfApplied,
  useQueryGroupListOfMine,
} from 'src/api/user/hooks';
import { styled } from 'stitches.config';
import Card from '../Card';
import ManagementButton from '../Card/ManagementButton';
import Status from '../Card/Status';
import EmptyView from '../EmptyView';
import Pagination from '../Pagination';
import GridLayout from './Layout';

export function GroupListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { data: groupListData } = useQueryGroupListOfAll();

  return (
    <main>
      <SGroupCount>{groupListData?.meetings.length}개의 모임</SGroupCount>
      {groupListData?.meetings.length ? (
        <>
          <GridLayout>
            {groupListData?.meetings.map(groupData => (
              <Card key={groupData.id} groupData={groupData} />
            ))}
          </GridLayout>

          <Box css={{ my: '$80' }}>
            <Pagination
              totalPagesLength={groupListData?.meta.pageCount}
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

export function GroupListOfMine() {
  const { data: mineData } = useQueryGroupListOfMine();

  return (
    <main>
      <SGroupCount>{mineData?.meetings.length}개의 모임</SGroupCount>
      {mineData?.meetings.length ? (
        <GridLayout>
          {mineData?.meetings.map(groupData => (
            <Card
              key={groupData.id}
              groupData={groupData}
              bottom={<ManagementButton id={groupData.id} />}
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

export function GroupListOfApplied() {
  const { data: applyData } = useQueryGroupListOfApplied();

  return (
    <main>
      <SGroupCount>{applyData?.apply.length}개의 모임</SGroupCount>
      {applyData?.apply.length ? (
        <GridLayout>
          {applyData?.apply.map(applyData => (
            <Card
              key={applyData.id}
              groupData={applyData.meeting}
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

const SGroupCount = styled('p', {
  fontAg: '18_semibold_100',
  '@mobile': {
    fontAg: '12_semibold_100',
  },
});
