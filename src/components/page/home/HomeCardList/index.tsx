import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import CardList from '@components/page/home/HomeCardList/CardList';

const HomeCardList = ({ groupBrowsingCardData }: { groupBrowsingCardData: GroupBrowsingCardResponse }) => {
  return (
    <div>
      <CardList label="🔹 우리... 같이 솝커톤 할래?" isMore data={groupBrowsingCardData.slice(0, 3)} />
      <CardList label="🔥 지금 모집중인 모임" data={groupBrowsingCardData.slice(0, 3)} />
      <CardList label="🍀 1차 행사 신청이 얼마 남지 않았어요!" data={groupBrowsingCardData.slice(0, 3)} />
    </div>
  );
};

export default HomeCardList;
