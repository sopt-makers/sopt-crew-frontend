import Link from 'next/link';
import { ReactNode } from 'react';

import DesktopSizeCard from './DesktopSizeCard';
import MobileSizeCard from './MobileSize';
import { styled } from 'stitches.config';
import { PART_OPTIONS, PART_VALUES, RECRUITMENT_STATUS } from '@constants/option';
import { ampli } from '@/ampli';
import { paths } from '@/__generated__/schema2';

interface CardProps {
  bottom?: ReactNode;
  meetingData: Omit<
    paths['/user/v2/meeting']['get']['responses']['200']['content']['application/json;charset=UTF-8']['meetings'][number],
    'isCoLeader'
  > & { isCoLeader?: boolean };
  mobileType: 'list' | 'card';
}

function Card({ bottom, meetingData, mobileType }: CardProps) {
  const isAllParts = meetingData.joinableParts?.length === 6 || meetingData.joinableParts === null;

  return (
    <CardWrapper
      css={{ '@tablet': { width: mobileType === 'list' ? '100%' : 'fit-content' } }}
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
      <Link href={`/detail?id=${meetingData.id}`}>
        <DesktopOnly>
          <DesktopSizeCard meetingData={meetingData} isAllParts={isAllParts} />
        </DesktopOnly>
        <MobileOnly>
          <MobileSizeCard meetingData={meetingData} isAllParts={isAllParts} mobileType={mobileType} />
        </MobileOnly>
      </Link>
      {bottom}
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled('li', {});
const DesktopOnly = styled('div', {
  '@tablet': {
    display: 'none',
  },
});
const MobileOnly = styled('div', {
  display: 'none',
  '@tablet': {
    display: 'flex',
    width: '100%',
  },
});
