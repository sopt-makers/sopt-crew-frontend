import { RecommendMeetingListQueryResponse, useGetRecommendMeetingListQuery } from '@api/meeting/hook';
import CardList from '@components/page/home/HomeCardList/CardList';
import { styled } from 'stitches.config';

const HomeCardList = ({ inProgressMeetingData }: { inProgressMeetingData: RecommendMeetingListQueryResponse }) => {
  const { data: recommendMeetings1 } = useGetRecommendMeetingListQuery({ meetingIds: [401, 394, 387] });
  const { data: recommendMeetings2 } = useGetRecommendMeetingListQuery({ meetingIds: [384, 320, 315] });
  const { data: recommendMeetings3 } = useGetRecommendMeetingListQuery({ meetingIds: [334, 326, 316] });

  return (
    <SWrapper>
      <SGradationRight />
      {recommendMeetings1 && (
        <CardList label="🔷 35기 AND 솝트 행사 뭐가 있을까?" data={recommendMeetings1.slice(0, 3)} />
      )}
      {/* <CardList label="🔥 지금 모집중인 모임" data={inProgressMeetingData.slice(0, 3)} /> */}
      {recommendMeetings2 && <CardList label="😋 쩝쩝박사들 모여라" data={recommendMeetings2.slice(0, 3)} />}
      {recommendMeetings3 && <CardList label="🦴 역사와 전통이 있는 모임" data={recommendMeetings3.slice(0, 3)} />}
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
  right: '-1px',
  pointerEvents: 'none',

  '@media (min-width: 1259px)': {
    display: 'none',
  },
  '@media (max-width: 768px)': {
    display: 'none',
  },
});
