import { Box } from '@components/box/Box';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MeetingResponse } from '@api/meeting';

import DesktopSizeCard from './DesktopSizeCard';
import MobileSizeCard from './MobileSizeCard';

interface CardProps {
  bottom?: ReactNode;
  meetingData: MeetingResponse;
}

function Card({ bottom, meetingData }: CardProps) {
  const isAllParts = meetingData.joinableParts?.length === 6 || meetingData.joinableParts === null;

  return (
    <Box as="li" css={{ '@tablet': { width: '100%' } }}>
      <Link href={`/detail?id=${meetingData.id}`} passHref>
        <a>
          <Box
            css={{
              '@tablet': {
                display: 'none',
              },
            }}
          >
            <DesktopSizeCard meetingData={meetingData} isAllParts={isAllParts} />
          </Box>

          <Box
            css={{
              display: 'none',
              '@tablet': {
                display: 'flex',
                width: '100%',
              },
            }}
          >
            <MobileSizeCard meetingData={meetingData} isAllParts={isAllParts} />
          </Box>
        </a>
      </Link>
      {bottom}
    </Box>
  );
}

export default Card;
