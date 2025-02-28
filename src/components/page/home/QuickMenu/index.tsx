import { styled } from 'stitches.config';
import BoltIcon from '@assets/svg/button_bolt.svg?rect';
import StudyIcon from '@assets/svg/button_study.svg?rect';
import SeminarIcon from '@assets/svg/button_seminar.svg?rect';
import EventIcon from '@assets/svg/button_event.svg?rect';
import Link from 'next/link';

const QuickMenu = () => {
  const menu = [
    { Icon: SBoltIcon, label: '번쩍 모임', link: '/list?category=번쩍' },
    { Icon: SStudyIcon, label: '스터디', link: '/list?category=스터디' },
    { Icon: SSeminarIcon, label: '세미나', link: '/list?category=세미나' },
    { Icon: SEventIcon, label: '행사', link: '/list?category=행사' },
  ];

  return (
    <SContainer>
      <SGuideBtn>모임 신청 가이드</SGuideBtn>
      {menu.map(item => (
        <Link key={item.label} href={item.link}>
          <SItem>
            <item.Icon />
            <SItemLabel>{item.label}</SItemLabel>
          </SItem>
        </Link>
      ))}
    </SContainer>
  );
};

export default QuickMenu;

const SContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',

  '@laptop': {
    flexDirection: 'row',
    gap: '32px',

    paddingLeft: '0',
  },
  '@media (max-width: 768px)': {
    gap: '9px',
  },
});

const SGuideBtn = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '20px 36px',
  height: 'fit-content',

  borderRadius: '9999px',
  backgroundColor: '$gray800',

  fontStyle: 'H2',
  letterSpacing: '-0.4px',
  color: '$white',

  '@laptop': {
    display: 'none',
  },
});

const SItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',

  cursor: 'pointer',

  '@laptop': {
    flexDirection: 'column',
    gap: '12px',
  },
});

const SItemLabel = styled('h3', {
  fontStyle: 'H2',
  letterSpacing: '-0.4px',
  color: '$white',
  textAlign: 'center',

  '@laptop': {
    flexDirection: 'column',
    gap: '12px',

    fontStyle: 'H4',
  },

  '@media (max-width: 768px)': {
    fontStyle: 'H4',
    flexDirection: 'column',
    gap: '12px',

    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '14px',
  },
});

const SBoltIcon = styled(BoltIcon, {
  width: '80px',
  height: '80px',

  cursor: 'pointer',

  '@media (max-width: 768px)': {
    width: '40px',
    height: 'auto',
  },
});

const SStudyIcon = styled(StudyIcon, {
  width: '80px',
  height: '80px',
  objectFit: 'contain',

  cursor: 'pointer',

  '@media (max-width: 768px)': {
    width: '40px',
    height: '40px',
  },
});

const SSeminarIcon = styled(SeminarIcon, {
  width: '80px',
  height: '80px',

  cursor: 'pointer',

  '@media (max-width: 768px)': {
    width: '40px',
    height: '40px',
  },
});

const SEventIcon = styled(EventIcon, {
  width: '80px',
  height: '80px',

  '@media (max-width: 768px)': {
    width: '40px',
    height: '40px',
  },
});
