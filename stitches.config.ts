/* eslint-disable @typescript-eslint/ban-types */

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
      white: '#fff',
      transparent: 'transparent',
      gray100: '#BBBBBB',
      gray200: '#838383',
      gray300: '#9C9C9C',
      gray400: '#5A5A5A',
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
      14: '14px',
      15: '15px',
      16: '16px',
      17: '17px',
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
      36: '36px',
      40: '40px',
      46: '46px',
      48: '48px',
      52: '52px',
      65: '65px',
      72: '72px',
      100: '100px',
      150: '150px',
      200: '200px',
      320: '320px',
      520: '520px',
    },
    fontSizes: {
      xs: '11px',
      sm: '12px',
      base: '13px',
      medium: '14px',
      lg: '16px',
      xl: '18px',
      xxl: '20px',
      xxxl: '26px',
      xxxxl: '32px',
      10: '10px',
      11: '11px',
      12: '12px',
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
      38: '38px',
      42: '42px',
      48: '48px',
      54: '54px',
      64: '64px',
      72: '72px',
      96: '96px',
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
      oriya: 'Oriya MN',
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
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
      72: '72px',
      320: '320px',
      520: '520px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
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
