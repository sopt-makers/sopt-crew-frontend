import { RecommendMeetingListQueryResponse, useGetRecommendMeetingListQuery } from '@api/meeting/hook';
import CardList from '@components/page/home/HomeCardList/CardList';
import { styled } from 'stitches.config';

const HomeCardList = ({ inProgressMeetingData }: { inProgressMeetingData: RecommendMeetingListQueryResponse }) => {
  const { data: recommendMeetings1 } = useGetRecommendMeetingListQuery({ meetingIds: [456, 458, 469] });
  const { data: recommendMeetings2 } = useGetRecommendMeetingListQuery({ meetingIds: [459, 460, 471] });
  const { data: recommendMeetings3 } = useGetRecommendMeetingListQuery({ meetingIds: [466, 475, 448] });

  return (
    <SWrapper>
      <SGradationRight />
      {recommendMeetings1 && (
        <CardList label="🔥 36기, 지금 가장 HOT한 모임 모아보기" data={recommendMeetings1.slice(0, 3)} />
      )}
      {/* <CardList label="🔥 지금 모집중인 모임" data={inProgressMeetingData.slice(0, 3)} /> */}
      {recommendMeetings2 && (
        <CardList label="✴️ SOPT의 뿌리 깊은 시그니처 모임" data={recommendMeetings2.slice(0, 3)} />
      )}
      {recommendMeetings3 && <CardList label="💥 SOPT와 함께하는 취미생활" data={recommendMeetings3.slice(0, 3)} />}
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
