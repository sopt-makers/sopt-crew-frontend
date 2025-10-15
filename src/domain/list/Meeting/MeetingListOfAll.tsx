import { ampli } from '@/ampli';
import { useGetAdvertisementQueryOption } from '@api/advertisement/query';
import { useMeetingListQueryOption } from '@api/meeting/query';
import { MeetingData } from '@api/meeting/type';
import { useUserProfileQueryOption } from '@api/user/query';
import { usePageParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { useScrollRestorationAfterLoading } from '@hook/useScrollRestoration';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AdvertisementCategory } from '@type/advertisement';
import Link from 'next/link';
import { useEffect } from 'react';
import { styled } from 'stitches.config';
import Card from '../Card';
import EmptyView from '../EmptyView';
import GridLayout from '../Grid/Layout';
import Pagination from '../Pagination';

export function MeetingListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { isDesktop } = useDisplay();
  const { data: meetingListData, isLoading } = useSuspenseQuery(useMeetingListQueryOption());
  const { data: meetingAds } = useQuery(useGetAdvertisementQueryOption(AdvertisementCategory.MEETING));

  useScrollRestorationAfterLoading(isLoading);
  const { data: me } = useQuery(useUserProfileQueryOption());

  useEffect(() => {
    ampli.impressionBanner({
      banner_id: meetingAds?.advertisements[0]?.advertisementId,
      banner_url: meetingAds?.advertisements[0]?.advertisementLink,
      banner_timestamp: meetingAds?.advertisements[0]?.advertisementStartDate,
    });
  }, [meetingAds]);

  return (
    <main>
      <SMeetingCountWrapper>
        <SMeetingCount>{meetingListData?.meta.itemCount}개의 모임</SMeetingCount>
      </SMeetingCountWrapper>
      {meetingListData?.meetings.length ? (
        <>
          <GridLayout mobileType="list">
            {meetingListData.meetings.slice(0, 2).map((meetingData: MeetingData) => (
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
