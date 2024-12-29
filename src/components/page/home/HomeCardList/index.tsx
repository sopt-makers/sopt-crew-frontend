import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import CardList from '@components/page/home/HomeCardList/CardList';
import { styled } from 'stitches.config';

const HomeCardList = ({ groupBrowsingCardData }: { groupBrowsingCardData: GroupBrowsingCardResponse }) => {
  return (
    <SWrapper>
      <SGradationRight />
      <CardList label="🔹 우리... 같이 솝커톤 할래?" data={groupBrowsingCardData.slice(0, 3)} />
      <CardList label="🔥 지금 모집중인 모임" data={groupBrowsingCardData.slice(0, 3)} />
      <CardList label="🍀 1차 행사 신청이 얼마 남지 않았어요!" data={groupBrowsingCardData.slice(0, 3)} />
    </SWrapper>
  );
};

export default HomeCardList;

const SWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});

const SGradationRight = styled('div', {
  width: '122px',
  height: '100%',
  background: 'linear-gradient(270deg, #0F0F12 0%, rgba(15, 15, 18, 0.00) 100%)',

  position: 'absolute',
  zIndex: 1,
  right: '-1px',
  pointerEvents: 'none',

  '@media (min-width: 1259px)': {
    display: 'none',
  },
  '@tablet': {
    display: 'none',
  },
});
