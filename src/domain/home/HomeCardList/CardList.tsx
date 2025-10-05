import { useRecommendMeetingListQuery } from '@api/meeting/query';
import DesktopCard from '@domain/home/HomeCardList/DesktopCard';
import MobileCard from '@domain/home/HomeCardList/MobileCard';
import { useDisplay } from '@hook/useDisplay';
import { fontsObject } from '@sopt-makers/fonts';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

type HomeCardProps = {
  label: string;
  isMore?: boolean;
  onMoreClick?: () => void;
  meetingIds: number[];
};

const CardList = ({ label, isMore = false, onMoreClick = () => {}, meetingIds }: HomeCardProps) => {
  const { isTablet } = useDisplay();
  const data = useQuery(useRecommendMeetingListQuery({ meetingIds })).data?.meetings;

  if (!data) return null;
  return (
    <SCardListWrapper>
      <SGradationRight />
      <STitleWrapper>
        <STitleStyle>{label}</STitleStyle>
        {isMore && <SMoreBtn onClick={onMoreClick}>{'더보기 >'}</SMoreBtn>}
      </STitleWrapper>
      <SCardWrapper>
        {isTablet ? (
          <>
            {data.map(d => (
              <MobileCard
                key={d.id}
                id={d.id}
                imageURL={d.imageURL[0]?.url}
                title={d.title}
                ownerName={d.user.name}
                ownerImage={d.user.profileImage}
                approvedCount={d.approvedCount || 0}
                capacity={d.capacity}
                category={d.category}
                canJoinOnlyActiveGeneration={d.canJoinOnlyActiveGeneration}
                joinableParts={d.joinableParts}
              />
            ))}
          </>
        ) : (
          <>
            {data.map(d => (
              <DesktopCard
                key={d.id}
                id={d.id}
                imageURL={d.imageURL[0]?.url}
                title={d.title}
                ownerName={d.user.name}
                ownerImage={d.user.profileImage}
                approvedCount={d.approvedCount || 0}
                capacity={d.capacity}
                category={d.category}
                canJoinOnlyActiveGeneration={d.canJoinOnlyActiveGeneration}
                joinableParts={d.joinableParts}
              />
            ))}
          </>
        )}
      </SCardWrapper>
    </SCardListWrapper>
  );
};

export default CardList;

const SCardListWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  paddingBottom: '$80',

  '@tablet': {
    paddingBottom: '$40',
  },
});

const SGradationRight = styled('div', {
  width: '80px',
  height: '346px',
  background: 'linear-gradient(270deg, #0F0F12 0%, rgba(15, 15, 18, 0.00) 50%)',

  position: 'absolute',
  right: '-1px',
  pointerEvents: 'none',

  '@media (min-width: 1259px)': {
    display: 'none',
  },
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const STitleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  paddingBottom: '$20',
});

const STitleStyle = styled('p', {
  padding: '4px 0 8px',

  fontStyle: 'H1',
  color: '$white',

  '@mobile': {
    ...fontsObject.TITLE_6_16_SB,
  },
});

const SMoreBtn = styled('button', {
  fontStyle: 'B2',
  color: '$gray200',
});

const SCardWrapper = styled('div', {
  display: 'flex',
  gap: '20px',

  '@tablet': {
    flexDirection: 'column',
    width: '100%',
  },

  '@laptop': {
    overflow: 'auto',
    hideScrollbar: true,
  },
});
