import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import HomeCard from '@components/page/home/HomeCardList/Card';
import { styled } from 'stitches.config';
import { Flex } from '@components/util/layout/Flex';

type HomeCardProps = {
  label: string;
  isMore?: boolean;
  onMoreClick?: () => void;
  data: GroupBrowsingCardResponse;
};

const CardList = ({ label, isMore = false, onMoreClick = () => {}, data }: HomeCardProps) => {
  return (
    <SCardListWrapper>
      <STitleWrapper>
        <STitleStyle>{label}</STitleStyle>
        {isMore && <SMoreBtn onClick={onMoreClick}>{'더보기 >'}</SMoreBtn>}
      </STitleWrapper>
      <Flex columnGap="20px">
        {data.map(d => (
          <HomeCard
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
      </Flex>
    </SCardListWrapper>
  );
};

export default CardList;

const SCardListWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  width: '894px',
  paddingBottom: '$80',
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
});

const SMoreBtn = styled('button', {
  fontStyle: 'B2',
  color: '$gray200',
});
