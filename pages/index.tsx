import { Box } from '@components/box/Box';
import Card from '@components/page/groupList/Card';
import Filter from '@components/page/groupList/filter/Filter';
import GridLayout from '@components/page/groupList/GirdLayout';
import Pagination from '@components/page/groupList/Pagination';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';

import type { NextPage } from 'next';
import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import usePageParams from '@hooks/queryString/usePageParams';

const Home: NextPage = () => {
  const { page, setPage } = usePageParams();
  return (
    <div>
      <main>
        <Flex align="center" justify="between">
          <TabList text={'all'} size="big" onChange={() => {}}>
            <TabList.Item text="all">모임 전체</TabList.Item>
            <TabList.Item text="mine">내 모임</TabList.Item>
          </TabList>
          <Link href="/make" passHref>
            <Flex
              as="a"
              align="center"
              justify="center"
              css={{
                width: '132px',
                height: '50px',
                background: '$purple100',
                borderRadius: '12px',
                '& > span': {
                  ml: '$12',
                  fontAg: '18_bold_100',

                  color: '$white',
                },
              }}
            >
              <PlusIcon />
              <span>모임생성</span>
            </Flex>
          </Link>
        </Flex>

        <Box css={{ mt: '$120', mb: '$64' }}>
          <Filter />
        </Box>

        <GridLayout>
          <Card id={0} />
          <Card id={1} />
          <Card id={2} />
          <Card id={3} />
        </GridLayout>
        <Box css={{ my: '$80' }}>
          <Pagination
            totalPagesLength={20}
            currentPageIndex={page}
            changeCurrentPage={setPage}
          />
        </Box>
      </main>
    </div>
  );
};

export default Home;
