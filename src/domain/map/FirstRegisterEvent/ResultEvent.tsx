import { useUserProfileQueryOption } from '@api/user/query';
import { Button } from '@sopt-makers/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import router from 'next/router';
import { styled } from 'stitches.config';

interface ResultEventProps {
  isWinLottery: boolean;
}
function ResultEvent({ isWinLottery }: ResultEventProps) {
  const { data: me } = useSuspenseQuery(useUserProfileQueryOption());

  const isWinLotteryConfig = {
    true: {
      title: () => (
        <STitleContainer>
          <STitle>
            축하해요, <span>{me.name}</span>님!
            <br />
            CU 기프티콘에 당첨됐어요 🎉
          </STitle>
          <SDescription>아래 버튼을 클릭하면 카카오톡 선물하기로 이동해요</SDescription>
        </STitleContainer>
      ),
      imageSrc: '/group/assets/images/mapEvent/crew_event_success_final.gif',
      alt: '첫 솝맵 등록 축하 선물 당첨 성공',
      buttonText: '선물 받으러 가기  >',
      onButtonClick: () => {
        window.open('https://kakaopay.com/send', '_blank');
      },
    },
    false: {
      title: () => (
        <STitle>
          아쉬워요.ㅠ.ㅠ
          <br />
          눈사람이 응원할게요 ⛄
        </STitle>
      ),
      imageSrc: '/group/assets/images/mapEvent/crew_event_fail_final.gif',
      alt: '첫 솝맵 등록 축하 선물 당첨 실패',
      buttonText: '솝맵 홈으로  >',
      onButtonClick: () => {
        router.push('/map');
      },
    },
  };

  const config = isWinLotteryConfig[isWinLottery ? 'true' : 'false'];

  return (
    <SContainer>
      {config.title()}
      <SImage src={config.imageSrc} alt={config.alt} />
      <SButton onClick={config.onButtonClick} size="lg" variant="fill" color="primary">
        {config.buttonText}
      </SButton>
    </SContainer>
  );
}

export default ResultEvent;

const SContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$44',

  margin: '80px auto',
  width: '100%',

  '@mobile': {
    margin: '48px auto',
  },
});

const STitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$6',
});

const STitle = styled('h1', {
  textAlign: 'center',

  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '42px',
  letterSpacing: '-0.56px',

  '& span': {
    color: '$secondary',
  },
});

const SDescription = styled('p', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '30px',
  letterSpacing: '-0.27px',

  color: '$gray300',
});

const SImage = styled('img', {
  width: '440px',
  height: '440px',

  '@mobile': {
    width: '360px',
    height: '360px',
  },
});

const SButton = styled(Button, {
  width: '560px',

  '@mobile': {
    width: '320px',
  },
});
