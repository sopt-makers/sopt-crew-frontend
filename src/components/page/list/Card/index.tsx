import { ampli } from '@/ampli';
import { MeetingListResponse } from '@api/API_LEGACY/meeting';
import DesktopSizeFlashCard from '@components/page/list/Card/DesktopSizeCard/DesktopSizeFlashCard';
import { PART_OPTIONS, PART_VALUES, RECRUITMENT_STATUS } from '@constants/option';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from 'stitches.config';
import DesktopSizeCard from './DesktopSizeCard';
import MobileSizeCard from './MobileSize';

interface CardProps {
  bottom?: ReactNode;
  meetingData: MeetingListResponse['meetings'][number];
  mobileType: 'list' | 'card';
}

function Card({ bottom, meetingData, mobileType }: CardProps) {
  const isFlash = meetingData.category === '번쩍';

  return (
    <CardWrapper
      css={{ '@mobile': { width: mobileType === 'list' ? '100%' : 'fit-content' } }}
      onClick={() => {
        ampli.clickGroupCard({
          group_id: meetingData.id,
          group_status: RECRUITMENT_STATUS[meetingData.status],
          group_category: meetingData.category,
          group_title: meetingData.title,
          group_owner_id: Number(meetingData.user.orgId),
          group_part: meetingData.joinableParts.map(part => PART_OPTIONS[PART_VALUES.indexOf(part)]).join(', '),
          group_generation: meetingData.canJoinOnlyActiveGeneration,
        });
      }}
    >
      <Link href={isFlash ? `/detail/flash?id=${meetingData.id}` : `/detail?id=${meetingData.id}`}>
        <DesktopOnly>
          {isFlash ? <DesktopSizeFlashCard meetingData={meetingData} /> : <DesktopSizeCard meetingData={meetingData} />}
        </DesktopOnly>
        <MobileOnly>
          <MobileSizeCard meetingData={meetingData} mobileType={mobileType} />
        </MobileOnly>
      </Link>
      {bottom}
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled('li', {});
const DesktopOnly = styled('div', {
  '@mobile': {
    display: 'none',
  },
});
const MobileOnly = styled('div', {
  display: 'none',
  '@mobile': {
    display: 'flex',
    width: '100%',
  },
});
