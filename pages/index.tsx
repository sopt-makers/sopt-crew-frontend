import { Box } from '@components/box/Box';
import GridLayout from '@components/page/groupList/Grid/Layout';
import Pagination from '@components/page/groupList/Pagination';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';

import type { NextPage } from 'next';
import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';
import Filter from '@components/page/groupList/Filter';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { GroupListOfAll } from '@components/page/groupList/Grid/List';

const Home: NextPage = () => {
  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text="all" size="big">
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
      <SSRSafeSuspense fallback={<p>loading...</p>}>
        <GroupListOfAll />
      </SSRSafeSuspense>
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
