import { styled } from '@stitches/react';
import { IconBell, IconChevronRight } from '@sopt-makers/icons';
import { fontsObject } from '@sopt-makers/fonts';

export const SIconBell = styled(IconBell, {
  width: '20px',
  height: '20px',
  '@mobile': {
    width: '16px',
    height: '16px',
  },
});

export const SIconChevronRight = styled(IconChevronRight, {
  width: '20px',
  height: '20px',
});

export const SSelectedAlarm = styled('span', {
  ...fontsObject.BODY_3_14_M,
  color: '$blue400',
});

export const SSettingButton = styled('button', {
  display: 'flex',
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$gray10',
  fontAg: '18_semibold_100',

  '@tablet': {
    padding: '0',
    fontAg: '14_semibold_100',
  },

  path: {
    stroke: '$gray10',
  },
  '@media (max-width: 320px)': {
    display: 'none',
  },
});
