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

const Home: NextPage = () => {
  const { value: page, setValue: setPage } = usePageParams();
  return (
    <div>
      <main>
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
        <SGroupCount>4개의 모임</SGroupCount>
        <GridLayout>
          <Card id={0} />
          <Card id={1} />
          <Card id={2} />
          <Card id={3} />
        </GridLayout>
        <Box css={{ my: '$80' }}>
          <Pagination
            totalPagesLength={20}
            currentPageIndex={Number(page)}
            changeCurrentPage={setPage}
          />
        </Box>
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
