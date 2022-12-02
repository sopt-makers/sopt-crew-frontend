/* eslint-disable @typescript-eslint/ban-types */

import { FontAg } from '@constants/font';
import {
  createStitches,
  CSS,
  PropertyValue,
  ScaleValue,
} from '@stitches/react';

const stitches = createStitches({
  theme: {
    colors: {
      black: '#000',
      white: '#fcfcfc',
      transparent: 'transparent',
      gray40: '#d7d7d7',
      gray50: '#d4d4d4',
      gray60: '#a9a9a9',
      gray80: '#838383',
      gray100: '#646464',
      black20: '#3c3d40',
      black40: '#333333',
      black60: '#2a2a2a',
      black80: '#232323',
      black90: '#1c1d1e',
      black100: '#181818',
      black60_trans: 'rgba(24,24,24,0.6)',
      black80_trans: 'rgba(24,24,24,0.8)',
      purple100: '#8040ff',
      purple200: '#6633cc',
      red100: '#bd372f',
    },
    space: {
      auto: 'auto',
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      11: '11px',
      12: '12px',
      13: '13px',
      14: '14px',
      15: '15px',
      16: '16px',
      17: '17px',
      18: '18px',
      19: '19px',
      20: '20px',
      21: '21px',
      22: '22px',
      23: '23px',
      24: '24px',
      25: '25px',
      26: '26px',
      27: '27px',
      28: '28px',
      29: '29px',
      30: '30px',
      32: '32px',
      34: '34px',
      35: '35px',
      36: '36px',
      40: '40px',
      44: '44px',
      46: '46px',
      48: '48px',
      50: '50px',
      52: '52px',
      59: '59px',
      60: '60px',
      63: '63px',
      64: '64px',
      65: '65px',
      68: '68px',
      69: '69px',
      70: '70px',
      72: '72px',
      80: '80px',
      82: '82px',
      84: '84px',
      88: '88px',
      90: '90px',
      96: '96px',
      100: '100px',
      103: '103px',
      115: '115px',
      120: '120px',
      125: '125px',
      132: '132px',
      150: '150px',
      180: '180px',
      200: '200px',
      320: '320px',
      374: '374px',
      520: '520px',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      medium: '18px',
      lg: '20px',
      xl: '22px',
      xxl: '24px',
      xxxl: '32px',
      title: '34px',
      12: '12px',
      14: '14px',
      15: '15px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      28: '28px',
      32: '32px',
      34: '34px',
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      heavy: 900,
    },
    sizes: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      11: '11px',
      12: '12px',
      13: '13px',
      14: '14px',
      15: '15px',
      16: '16px',
      18: '18px',
      20: '20px',
      21: '21px',
      22: '22px',
      23: '23px',
      24: '24px',
      25: '25px',
      26: '26px',
      27: '27px',
      28: '28px',
      29: '29px',
      30: '30px',
      32: '32px',
      34: '34px',
      48: '48px',
      60: '60px',
      64: '64px',
      72: '72px',
      80: '80px',
      90: '90px',
      109: '109px',
      125: '125px',
      139: '139px',
      144: '144px',
      147: '147px',
      167: '167px',
      175: '175px',
      180: '180px',
      200: '200px',
      216: '216px',
      219: '219px',
      280: '280px',
      298: '298px',
      300: '300px',
      320: '320px',
      356: '356px',
      508: '508px',
      520: '520px',
      594: '594px',
      646: '646px',
      820: '820px',
      869: '869px',
    },
    radii: {
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      50: '50px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      min: '-1',
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '9999',
      max1: '10000',
    },
    transitions: {},
    lineHeights: {
      100: '100%',
      140: '140%',
      150: '150%',
      170: '170%',
    },
  },
  media: {
    mobile: '(max-width: 640px)',
    tablet: '(max-width:830px)',
    desktop: '(min-width: 831px)',
  },
  utils: {
    size: (value: number) => ({
      width: value,
      height: value,
    }),
    m: (value: ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: ScaleValue<'space'>) => ({
      marginTop: value,
    }),
    mr: (value: ScaleValue<'space'>) => ({
      marginRight: value,
    }),
    mb: (value: ScaleValue<'space'>) => ({
      marginBottom: value,
    }),
    ml: (value: ScaleValue<'space'>) => ({
      marginLeft: value,
    }),
    mx: (value: ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (value: ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: ScaleValue<'space'>) => ({
      paddingTop: value,
    }),
    pr: (value: ScaleValue<'space'>) => ({
      paddingRight: value,
    }),
    pb: (value: ScaleValue<'space'>) => ({
      paddingBottom: value,
    }),
    pl: (value: ScaleValue<'space'>) => ({
      paddingLeft: value,
    }),
    px: (value: ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    inset: () => (value: string | number) => ({
      top: value,
      right: value,
      bottom: value,
      left: value,
    }),

    br: (value: PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),

    bg: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    spaceX: () => (value: string | number) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        marginLeft: value,
      },
    }),
    spaceY: () => (value: string | number) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        marginTop: value,
      },
    }),
    insetX: () => (value: string | number) => ({
      top: value,
      right: value,
    }),
    insetY: () => (value: string | number) => ({
      top: value,
      bottom: value,
    }),
    fontAg: (value: FontAg) => {
      const [fontSize, fontWeight, fontHeight] = value.split('_');
      return {
        fontSize: `$${fontSize}`,
        fontWeight: `$${fontWeight}`,
        lineHeight: `$${fontHeight}`,
      };
    },
    flexType: (value: 'center' | 'horizontalCenter' | 'verticalCenter') => {
      if (value === 'center') {
        return {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        };
      }

      if (value === 'horizontalCenter') {
        return {
          display: 'flex',
          justifyContent: 'center',
        };
      }

      return {
        display: 'flex',
        alignItems: 'center',
      };
    },
    clickable: () => ({
      position: 'relative',
      cursor: 'pointer',
      '&:after': {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(31, 46, 61, 0.04)',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity: '0',
        transition: 'opacity 0.2s',
      },
      '&:active': {
        '&:after': {
          opacity: 1,
        },
      },
    }),
  },
});

export type CSSType = CSS<typeof stitches>;
export type Color = string;

export const { styled, css, theme, getCssText, globalCss, keyframes, config } =
  stitches;

export type HexColorKey = keyof typeof theme.colors;
export const rawColors = theme.colors;
