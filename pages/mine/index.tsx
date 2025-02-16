import type { NextPage } from 'next';

import { Tab } from '@headlessui/react';
import useSessionStorage from '@hooks/useSessionStorage';
import { Fragment, useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';
import CardSkeleton from '@components/page/list/Card/Skeleton';
import GridLayout from '@components/page/list/Grid/Layout';
import { MeetingListOfApplied, MeetingListOfMine } from '@components/page/list/Grid/List';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import CrewTab from '@components/CrewTab';
import KakaoFloatingButton from '@components/kakaoFloatingButton/KakaoFloatingButton';

const enum MeetingType {
  APPLIED,
  MADE,
}

const MinePage: NextPage = () => {
  const [selectedMeetingType, setSelectedMeetingType] = useSessionStorage<MeetingType>(
    'meetingType',
    MeetingType.APPLIED
  );

  return (
    <div>
      <CrewTab />
      <Tab.Group selectedIndex={Number(selectedMeetingType)} onChange={setSelectedMeetingType}>
        <STabList>
          <Tab as={Fragment}>
            <STab
              isSelected={Number(selectedMeetingType) === MeetingType.APPLIED}
              onClick={() => ampli.clickRegisteredGroup()}
            >
              내가 신청한 모임
            </STab>
          </Tab>
          <Tab as={Fragment}>
            <STab
              isSelected={Number(selectedMeetingType) === MeetingType.MADE}
              onClick={() => ampli.clickMakebymeGroup()}
            >
              내가 만든 모임
            </STab>
          </Tab>
        </STabList>

        <Tab.Panels>
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
        </Tab.Panels>
      </Tab.Group>

      <div style={{ position: 'fixed', bottom: '2%', right: '5%' }}>
        <KakaoFloatingButton />
      </div>
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
        color: '$gray10',
        backgroundColor: '$gray600',
      },
      false: { color: '$gray500' },
    },
  },
  '@tablet': {
    fontAg: '14_bold_100',
    py: '$12',
  },
});
