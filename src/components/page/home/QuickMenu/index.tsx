import { styled } from 'stitches.config';
import BoltIcon from '@assets/svg/button_bolt.svg?rect';
import StudyIcon from '@assets/svg/button_study.svg?rect';
import SeminarIcon from '@assets/svg/button_seminar.svg?rect';
import EventIcon from '@assets/svg/button_event.svg?rect';
import Link from 'next/link';
import { useDisplay } from '@hooks/useDisplay';

const QuickMenu = () => {
  const { isTablet } = useDisplay();

  const menu = [
    { Icon: BoltIcon, label: '번쩍', link: '/list?category=번쩍' },
    { Icon: StudyIcon, label: '스터디', link: '/list?category=스터디' },
    { Icon: SeminarIcon, label: '세미나', link: '/list?category=세미나' },
    { Icon: EventIcon, label: '행사', link: '/list?category=행사' },
  ];

  return (
    <SContainer>
      {menu.map(item => (
        <Link key={item.label} href={item.link}>
          <SItem>
            <SMenuBtn>
              <item.Icon width={isTablet ? 30 : 40} height={isTablet ? 30 : 40} />
            </SMenuBtn>
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
    gap: '40px',

    paddingLeft: '0',
  },
  '@mobile': {
    gap: '9px',
  },
});

const SMenuBtn = styled('button', {
  display: 'flex',

  padding: '20px',

  borderRadius: '28px',
  background: '$gray900',

  '@tablet': {
    padding: '8px',
    borderRadius: '14.667px',
  },

  '&:hover': {
    background: '$gray700',
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

    fontStyle: 'H4',
  },

  '@tablet': {
    fontStyle: 'H4',
    flexDirection: 'column',

    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '13px',
  },
});
