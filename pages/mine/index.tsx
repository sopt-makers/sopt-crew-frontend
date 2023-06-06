import type { NextPage } from 'next';

import { TabList } from '@components/tabList/TabList';
import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { styled } from 'stitches.config';
import { Fragment } from 'react';
import useSessionStorage from '@hooks/useSessionStorage';

import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { MeetingListOfApplied, MeetingListOfMine } from '@components/page/meetingList/Grid/List';
import GridLayout from '@components/page/meetingList/Grid/Layout';
import CardSkeleton from '@components/page/meetingList/Card/Skeleton';

const enum MeetingType {
  MADE,
  APPLIED,
}

const MinePage: NextPage = () => {
  const [selectedMeetingType, setSelectedMeetingType] = useSessionStorage<MeetingType>('meetingType', MeetingType.MADE);

  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text="mine" size="big">
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
      </Flex>
      <Tab.Group selectedIndex={Number(selectedMeetingType)} onChange={setSelectedMeetingType}>
        <STabList>
          <Tab as={Fragment}>
            <STab isSelected={Number(selectedMeetingType) === MeetingType.MADE}>내가 만든 모임</STab>
          </Tab>
          <Tab as={Fragment}>
            <STab isSelected={Number(selectedMeetingType) === MeetingType.APPLIED}>내가 신청한 모임</STab>
          </Tab>
        </STabList>

        <Tab.Panels>
          <Tab.Panel>
            <SSRSafeSuspense
              fallback={
                <GridLayout mobileType="card">
                  {new Array(6).fill(null).map((_, index) => (
                    <CardSkeleton key={index} mobileType="card" />
                  ))}
                </GridLayout>
              }
            >
              <MeetingListOfMine />
            </SSRSafeSuspense>
          </Tab.Panel>

          <Tab.Panel>
            <SSRSafeSuspense
              fallback={
                <GridLayout mobileType="card">
                  {new Array(4).fill(null).map((_, index) => (
                    <CardSkeleton key={index} mobileType="card" />
                  ))}
                </GridLayout>
              }
            >
              <MeetingListOfApplied />
            </SSRSafeSuspense>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MinePage;

const STabList = styled(Tab.List, {
  flexType: 'center',
  marginTop: '126px',
  paddingBottom: '64px',
  '@tablet': {
    marginTop: '48px',
    paddingBottom: '24px',
  },
});

const STab = styled('button', {
  fontAg: '20_bold_100',
  px: '$16',
  py: '$14',
  borderRadius: '10px',
  variants: {
    isSelected: {
      true: {
        color: '$white100',
        backgroundColor: '$black40',
      },
      false: { color: '$gray100' },
    },
  },
  '@tablet': {
    fontAg: '14_bold_100',
    py: '$12',
  },
});
