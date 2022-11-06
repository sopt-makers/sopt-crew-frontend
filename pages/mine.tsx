import { Box } from '@components/box/Box';
import Card from '@components/page/groupList/card/Card';
import GridLayout from '@components/page/groupList/GirdLayout';
import { TabList } from '@components/tabList/TabList';

import type { NextPage } from 'next';

import { Flex } from '@components/util/layout/Flex';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { styled } from 'stitches.config';
import { useState } from 'react';
import { Fragment } from 'react';
import InvitationButton from '@components/page/groupList/card/invitationButton';

const MinePage: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <main>
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
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <STabList>
            <Tab as={Fragment}>
              <STab isSelected={selectedIndex === 0}>내가 만든 모임</STab>
            </Tab>
            <Tab as={Fragment}>
              <STab isSelected={selectedIndex === 1}>내가 신청한 모임</STab>
            </Tab>
          </STabList>

          <Tab.Panels>
            <Tab.Panel>
              <SGroupCount>4개의 모임</SGroupCount>
              <GridLayout>
                <Card id={0} bottom={<InvitationButton />} />
                <Card id={1} />
                <Card id={2} />
                <Card id={3} />
              </GridLayout>
            </Tab.Panel>

            <Tab.Panel>
              <SGroupCount>5개의 모임</SGroupCount>

              <GridLayout>
                <Card id={0} />
                <Card id={1} />
                <Card id={2} />
                <Card id={3} />
                <Card id={4} />
              </GridLayout>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
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

const SGroupCount = styled('p', {
  fontAg: '18_semibold_100',
});
