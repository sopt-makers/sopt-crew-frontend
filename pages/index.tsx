import type { NextPage } from 'next';

import { Box } from '@components/box/Box';
import { TabList } from '@components/tabList/TabList';
import PlusIcon from '@assets/svg/plus.svg';
import WriteIcon from '@assets/svg/write.svg';

import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';
import Filter from '@components/page/meetingList/Filter';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { MeetingListOfAll } from '@components/page/meetingList/Grid/List';
import Search from '@components/page/meetingList/Filter/Search';
import GridLayout from '@components/page/meetingList/Grid/Layout';
import CardSkeleton from '@components/page/meetingList/Card/Skeleton';

const Home: NextPage = () => {
  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text="all" size="big">
          <Link href="/" passHref>
            <a>
              <TabList.Item text="all">전체 모임</TabList.Item>
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
            <SMakeMeeting align="center" justify="center">
              <PlusIcon />
              <span>모임 개설하기</span>
            </SMakeMeeting>
          </a>
        </Link>
        <SMobileButtonMeeting>
          <Link href="/make" passHref>
            <a>
              <WriteIcon />
            </a>
          </Link>
          <Search.Mobile />
        </SMobileButtonMeeting>
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
        <MeetingListOfAll />
      </SSRSafeSuspense>
    </div>
  );
};

export default Home;

const SMakeMeeting = styled(Flex, {
  padding: '$18 $24 $18 $20',
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

const SMobileButtonMeeting = styled(Flex, {
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
