import { GetMeetingList } from '@api/meeting/type';
import MobileSizeCard from '@shared/groupBrowsing/GroupBrowsingCard/GroupBrowsingCard';
import { styled } from 'stitches.config';

interface CarouselProps {
  cardList: GetMeetingList['response']['meetings'];
}

const GroupBrowsingSlider = ({ cardList }: CarouselProps) => {
  return (
    <SSlider>
      {cardList.map(card => (
        <MobileSizeCard key={card.id} {...card} />
      ))}{' '}
    </SSlider>
  );
};

export default GroupBrowsingSlider;

const SSlider = styled('div', {
  display: 'flex',
  gap: '$12',
  overflow: 'auto hidden',
});
