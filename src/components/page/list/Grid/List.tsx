import { ampli } from '@/ampli';
import { useGetAdvertisementQuery } from '@api/advertisement/hook';
import { useMeetingListQuery } from '@api/meeting/hook';
import { MeetingData } from '@api/meeting/type';
import { useUserApplicationQuery, useUserMeetingListQuery, useUserProfileQuery } from '@api/user/hooks';
import { usePageParams } from '@hooks/queryString/custom';
import { useDisplay } from '@hooks/useDisplay';
import { useScrollRestorationAfterLoading } from '@hooks/useScrollRestoration';
import { AdvertisementCategory } from '@type/advertisement';
import Link from 'next/link';
import { useEffect } from 'react';
import { styled } from 'stitches.config';
import Card from '../Card';
import ManagementButton from '../Card/ManagementButton';
import Status from '../Card/Status';
import EmptyView from '../EmptyView';
import Pagination from '../Pagination';
import GridLayout from './Layout';

export function MeetingListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { isDesktop } = useDisplay();
  const { data: meetingListData, isLoading } = useMeetingListQuery();
  const { data: meetingAds } = useGetAdvertisementQuery(AdvertisementCategory.MEETING);

  useScrollRestorationAfterLoading(isLoading);
  const { data: me } = useUserProfileQuery();

  useEffect(() => {
    ampli.impressionBanner({
      banner_id: meetingAds?.advertisements[0]?.advertisementId,
      banner_url: meetingAds?.advertisements[0]?.advertisementLink,
      banner_timestamp: meetingAds?.advertisements[0]?.advertisementStartDate,
    });
  }, []);

  return (
    <main>
      <SMeetingCountWrapper>
        <SMeetingCount>{meetingListData?.meta.itemCount}개의 모임</SMeetingCount>
      </SMeetingCountWrapper>
      {meetingListData?.meetings.length ? (
        <>
          <GridLayout mobileType="list">
            {meetingListData?.meetings.slice(0, 2).map((meetingData: MeetingData) => (
              <Card key={meetingData.id} meetingData={meetingData} mobileType="list" />
            ))}

            {meetingAds?.advertisements && meetingListData?.meta.page === 1 && (
              <Link
                href={meetingAds?.advertisements[0]?.advertisementLink ?? ''}
                target="_blank"
                onClick={() =>
                  ampli.clickBanner({
                    banner_id: meetingAds?.advertisements[0]?.advertisementId,
                    banner_url: meetingAds?.advertisements[0]?.advertisementLink,
                    banner_timestamp: meetingAds?.advertisements[0]?.advertisementStartDate,
                    user_id: Number(me?.orgId),
                  })
                }
              >
                {isDesktop ? (
                  <img
                    src={meetingAds?.advertisements[0]?.desktopImageUrl}
                    style={{ width: '380px', height: '478px', borderRadius: '12px' }}
                  ></img>
                ) : (
                  <img
                    src={meetingAds?.advertisements[0]?.mobileImageUrl}
                    style={{ width: '100%', height: '82px', borderRadius: '8px' }}
                  ></img>
                )}
              </Link>
            )}
            {meetingListData?.meetings.slice(2).map(meetingData => (
              <Card key={meetingData.id} meetingData={meetingData} mobileType="list" />
            ))}
          </GridLayout>

          <PaginationWrapper>
            <Pagination
              totalPagesLength={meetingListData?.meta.pageCount}
              currentPageIndex={Number(page)}
              changeCurrentPage={setPage}
            />
          </PaginationWrapper>
        </>
      ) : (
        <EmptyView message="검색 결과가 없습니다." />
      )}
    </main>
  );
}
const PaginationWrapper = styled('div', {
  my: '$80',
});

export function MeetingListOfMine() {
  const { data: mineData, isLoading } = useUserMeetingListQuery();
  useScrollRestorationAfterLoading(isLoading);
  return (
    <main style={{ marginBottom: '20%' }}>
      <SMeetingCount>{mineData?.meetings.length}개의 모임</SMeetingCount>
      {mineData?.meetings.length ? (
        <GridLayout mobileType="card">
          {mineData?.meetings.map(meetingData => (
            <Card
              key={meetingData.id}
              // TODO: mine meetingData 에 welcomeMessageTypes, meetingKeywordTypes 가 현재 없지만, 곧 서버에서 내려줄 예정
              meetingData={meetingData as unknown as MeetingData}
              mobileType="card"
              bottom={
                meetingData?.isCoLeader ? (
                  <SBlankManageMentButton></SBlankManageMentButton>
                ) : (
                  <ManagementButton id={meetingData.id} />
                )
              }
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

export function MeetingListOfApplied() {
  const { data: applyData, isLoading } = useUserApplicationQuery();
  useScrollRestorationAfterLoading(isLoading);

  return (
    <main>
      <SMeetingCount>{applyData?.apply.length}개의 모임</SMeetingCount>
      {applyData?.apply.length ? (
        <GridLayout mobileType="card">
          {applyData?.apply.map(applyData => (
            <Card
              key={applyData.id}
              // TODO: mine meetingData 에 welcomeMessageTypes, meetingKeywordTypes 가 현재 없지만, 곧 서버에서 내려줄 예정
              meetingData={applyData.meeting as unknown as MeetingData}
              mobileType="card"
              bottom={<Status status={applyData.status} />}
            />
          ))}
        </GridLayout>
      ) : (
        <EmptyView message="모임이 없습니다." />
      )}
    </main>
  );
}

const SMeetingCountWrapper = styled('div', {
  display: 'flex',
  '@media (max-width: 849px)': {
    justifyContent: 'center',
  },
});

const SMeetingCount = styled('p', {
  fontStyle: 'H3',
  '@media (max-width: 849px)': {
    width: '380px',
  },
  '@mobile': {
    fontAg: '14_semibold_100',
    width: '100%',
  },
});

const SBlankManageMentButton = styled('div', {
  width: '128px',
  padding: '12px 12px 13px 14px',
  borderRadius: '71px',
  fontAg: '16_bold_100',
  whiteSpace: 'nowrap',
  //background: '$gray800',
  '@media (max-width: 768px)': {
    width: '91px',
    //todo: 참여자 리스트 버튼으로 바꾸기
    height: '30px',
    marginTop: '16px',
    fontStyle: 'T6',
    padding: '6px 6px 6px 12px',
  },
});
