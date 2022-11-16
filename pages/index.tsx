import { Box } from '@components/box/Box';
import GridLayout from '@components/page/groupList/GirdLayout';
import Pagination from '@components/page/groupList/Pagination';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';

import type { NextPage } from 'next';
import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';
import { usePageParams } from '@hooks/queryString/custom';
import Card from '@components/page/groupList/Card';
import Filter from '@components/page/groupList/Filter';
import { useGroupListOfAll } from 'src/api/meeting/hooks';
import EmptyView from '@components/page/groupList/EmptyView';

const Home: NextPage = () => {
  const { value: page, setValue: setPage } = usePageParams();
  const { data: groupListData } = useGroupListOfAll();

  if (!groupListData) return <div> loading...</div>;
  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text={'all'} size="big" onChange={() => {}}>
          <Link href="/" passHref>
            <a>
              <TabList.Item text="all">모임 전체</TabList.Item>
            </a>
          </Link>
          <Link href="/mine" passHref>
            <a>
              <TabList.Item text="mine">내 모임</TabList.Item>
            </a>
          </Link>
        </TabList>
        <Link href="/make" passHref>
          <a>
            <SMakeGroup align="center" justify="center">
              <PlusIcon />
              <span>모임생성</span>
            </SMakeGroup>
          </a>
        </Link>
      </Flex>

      <Box css={{ mt: '$120', mb: '$64' }}>
        <Filter />
      </Box>
      <main>
        <SGroupCount>{groupListData.meetings.length}개의 모임</SGroupCount>
        {groupListData.meetings.length ? (
          <>
            <GridLayout>
              {groupListData.meetings.map(groupData => (
                <Card key={groupData.id} groupData={groupData} />
              ))}
            </GridLayout>

            <Box css={{ my: '$80' }}>
              <Pagination
                totalPagesLength={groupListData.count}
                currentPageIndex={Number(page)}
                changeCurrentPage={setPage}
              />
            </Box>
          </>
        ) : (
          <EmptyView message="검색 결과가 없습니다." />
        )}
      </main>
    </div>
  );
};

export default Home;

const SMakeGroup = styled(Flex, {
  width: '132px',
  height: '50px',
  background: '$purple100',
  borderRadius: '12px',
  '& > span': {
    ml: '$12',
    fontAg: '18_bold_100',

    color: '$white',
  },
});

const SGroupCount = styled('p', {
  fontAg: '18_semibold_100',
});
