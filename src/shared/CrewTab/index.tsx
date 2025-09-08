import { ampli } from '@/ampli';
import { TabList } from '@common/tabList/TabList';
import { Flex } from '@shared/util/layout/Flex';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const CrewTab = ({ children }: { children?: ReactNode }) => {
  const path = useRouter().pathname;
  const tabText = {
    group: 'feedAll',
    list: 'groupAll',
    mine: 'mine',
    management: 'mine',
  };

  const lastSegment = (path.split('/').at(-1) || 'group') as keyof typeof tabText;

  return (
    <Flex align="center" justify="between">
      <TabList text={tabText[lastSegment]} size="big">
        <Link href="/" onClick={() => ampli.clickNavbarGroup({ menu: '피드' })}>
          <TabList.Item text="feedAll">홈</TabList.Item>
        </Link>
        <Link href="/list" onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
          <TabList.Item text="groupAll">전체 모임</TabList.Item>
        </Link>
        <Link href="/mine" onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </Link>
      </TabList>
      {children}
    </Flex>
  );
};

export default CrewTab;
