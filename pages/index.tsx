import { Box } from '@components/box/Box';
import Card from '@components/page/groupList/card/Card';
import Filter from '@components/page/groupList/filter/Filter';
import GridLayout from '@components/page/groupList/GirdLayout';
import Pagination from '@components/page/groupList/Pagination';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';

import type { NextPage } from 'next';
import {
  FilterProvider,
  useFilterContext,
} from '@providers/groupList/FilterProvider';
import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';

const HomePage = () => {
  return (
    <FilterProvider>
      <Home />
    </FilterProvider>
  );
};

const Home: NextPage = () => {
  const { currentPageIndex, changeCurrentPage } = useFilterContext();

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
              <Flex
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
            currentPageIndex={currentPageIndex}
            changeCurrentPage={changeCurrentPage}
          />
        </Box>
      </main>
    </div>
  );
};

export default HomePage;

const SGroupCount = styled('p', {
  fontAg: '18_semibold_100',
});
