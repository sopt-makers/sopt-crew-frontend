import type { NextPage } from 'next';

import { Box } from '@components/box/Box';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';
import WriteIcon from '@assets/svg/write.svg';

import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';
import Filter from '@components/page/groupList/Filter';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { GroupListOfAll } from '@components/page/groupList/Grid/List';
import Search from '@components/page/groupList/Filter/Search';
import GridLayout from '@components/page/groupList/Grid/Layout';
import CardSkeleton from '@components/page/groupList/Card/Skeleton';

const Home: NextPage = () => {
  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text="all" size="big">
          <TabList.Item text="all">
            <Link href="/">
              <a>전체 모임</a>
            </Link>
          </TabList.Item>
          <TabList.Item text="mine">
            <Link href="/mine">
              <a>내 모임</a>
            </Link>
          </TabList.Item>
        </TabList>
        <Link href="/make" passHref>
          <a>
            <SMakeGroup align="center" justify="center">
              <PlusIcon />
              <span>모임개설</span>
            </SMakeGroup>
          </a>
        </Link>
        <SMobileButtonGroup>
          <Link href="/make" passHref>
            <a>
              <WriteIcon />
            </a>
          </Link>
          <Search.Mobile />
        </SMobileButtonGroup>
      </Flex>
      <SFilterWrapper>
        <Filter />
      </SFilterWrapper>
      <SSRSafeSuspense
        fallback={
          <GridLayout>
            {new Array(4).fill(null).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </GridLayout>
        }
      >
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
  '@mobile': {
    display: 'none',
  },
});

const SMobileButtonGroup = styled(Flex, {
  display: 'none',
  '@mobile': {
    display: 'flex',
  },
  '& > a': {
    mr: '$18',
  },
});

const SFilterWrapper = styled(Box, {
  mt: '$120',
  mb: '$64',
  '@mobile': {
    mt: '$48',
    mb: '$24',
  },
});
