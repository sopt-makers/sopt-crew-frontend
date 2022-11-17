import Card from '@components/page/groupList/Card';
import GridLayout from '@components/page/groupList/GirdLayout';
import { TabList } from '@components/tabList/TabList';

import type { NextPage } from 'next';

import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { styled } from 'stitches.config';
import { Fragment } from 'react';
import InvitationButton from '@components/page/groupList/Card/InvitationButton';
import Status from '@components/page/groupList/Card/Status';
import useSessionStorage from '@hooks/useSessionStorage';
import { useGroupListOfApplied, useGroupListOfMine } from 'src/api/user/hooks';
import EmptyView from '@components/page/groupList/EmptyView';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';

const enum GroupType {
  MADE,
  APPLIED,
}

const MinePage: NextPage = () => {
  const [selectedGroupType, setSelectedGroupType] =
    useSessionStorage<GroupType>('groupType', GroupType.MADE);

  return (
    <div>
      <Flex align="center" justify="between">
        <TabList text={'mine'} size="big" onChange={() => {}}>
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
      </Flex>
      <Tab.Group
        selectedIndex={Number(selectedGroupType)}
        onChange={setSelectedGroupType}
      >
        <STabList>
          <Tab as={Fragment}>
            <STab isSelected={Number(selectedGroupType) === GroupType.MADE}>
              내가 만든 모임
            </STab>
          </Tab>
          <Tab as={Fragment}>
            <STab isSelected={Number(selectedGroupType) === GroupType.APPLIED}>
              내가 신청한 모임
            </STab>
          </Tab>
        </STabList>

        <Tab.Panels>
          <Tab.Panel>
            <SSRSafeSuspense fallback={<p>loading...</p>}>
              <GroupListOfMine />
            </SSRSafeSuspense>
          </Tab.Panel>

          <Tab.Panel>
            <SSRSafeSuspense fallback={<p>loading...</p>}>
              <GroupListOfApplied />
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
});

const STab = styled('button', {
  fontAg: '20_bold_100',
  px: '$16',
  py: '$14',
  borderRadius: '10px',
  variants: {
    isSelected: {
      true: {
        color: '$white',
        backgroundColor: '$black40',
      },
      false: { color: '$gray100' },
    },
  },
});

function GroupListOfMine() {
  const { data: mineData } = useGroupListOfMine();
  return (
    <main>
      <SGroupCount>{mineData?.meetings.length}개의 모임</SGroupCount>
      {mineData?.meetings.length ? (
        <GridLayout>
          {mineData?.meetings.map(groupData => (
            <Card
              key={groupData.id}
              groupData={groupData}
              bottom={<InvitationButton id={groupData.id} />}
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

function GroupListOfApplied() {
  const { data: applyData } = useGroupListOfApplied();
  return (
    <main>
      <SGroupCount>{applyData?.apply.length}개의 모임</SGroupCount>
      <GridLayout>
        {applyData?.apply.length ? (
          <GridLayout>
            {applyData?.apply.map(applyData => (
              <Card
                key={applyData.id}
                groupData={applyData.meeting}
                bottom={<Status status={applyData.meeting.status} />}
              />
            ))}
          </GridLayout>
        ) : (
          <EmptyView message="모임이 없습니다." />
        )}
      </GridLayout>
    </main>
  );
}
const SGroupCount = styled('p', {
  fontAg: '18_semibold_100',
});
