import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import DesktopCard from '@components/page/home/HomeCardList/DesktopCard';
import MobileCard from '@components/page/home/HomeCardList/MobileCard';
import { useDisplay } from '@hooks/useDisplay';
import { fontsObject } from '@sopt-makers/fonts';
import { styled } from 'stitches.config';

type HomeCardProps = {
  label: string;
  isMore?: boolean;
  onMoreClick?: () => void;
  data: GroupBrowsingCardResponse;
};

const CardList = ({ label, isMore = false, onMoreClick = () => {}, data }: HomeCardProps) => {
  const { isTablet } = useDisplay();

  return (
    <SCardListWrapper>
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
                imageURL={d.imageURL[0].url}
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
                imageURL={d.imageURL[0].url}
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

  width: '894px',
  paddingBottom: '$80',

  '@laptop': {
    width: '790px',
    overflow: 'hidden',
  },
  '@tablet': {
    width: '100%',
    paddingBottom: '$40',
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

  '@tablet': {
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
});
