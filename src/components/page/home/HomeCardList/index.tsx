import { RecommendMeetingListQueryResponse, useGetRecommendMeetingListQuery } from '@api/meeting/hook';
import CardList from '@components/page/home/HomeCardList/CardList';
import { styled } from 'stitches.config';

const HomeCardList = ({ groupBrowsingCardData }: { groupBrowsingCardData: RecommendMeetingListQueryResponse }) => {
  const { data: recommendMeetings } = useGetRecommendMeetingListQuery({ meetingIds: [359, 360, 361] });
  const { data: nowRecruitingMeetings } = useGetRecommendMeetingListQuery({ meetingIds: [] });

  return (
    <SWrapper>
      <SGradationRight />
      {recommendMeetings && <CardList label="🔹 우리... 같이 솝커톤 할래?" data={recommendMeetings.slice(0, 3)} />}
      {nowRecruitingMeetings && <CardList label="🔥 지금 모집중인 모임" data={nowRecruitingMeetings.slice(0, 3)} />}
      {recommendMeetings && (
        <CardList label="🍀 1차 행사 신청이 얼마 남지 않았어요!" data={recommendMeetings.slice(0, 3)} />
      )}
    </SWrapper>
  );
};

export default HomeCardList;

const SWrapper = styled('div', {
  position: 'relative',
  width: '894px',

  '@laptop': {
    width: '100%',
  },
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
