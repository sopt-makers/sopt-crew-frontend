import { keyframes, styled } from 'stitches.config';

const Loader = () => {
  return (
    <SLoaderWrapper aria-label="로딩 중" aria-live="polite" aria-busy="true">
      <span />
      <span />
      <span />
    </SLoaderWrapper>
  );
};

export default Loader;

const jump = keyframes({
  '33%': { transform: 'translateY(10px)' },
  '66%': { transform: 'translateY(-10px)' },
  '100%': { transform: 'translateY(0px)' },
});

const SLoaderWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',

  span: {
    display: 'inline-block',
    margin: '$2',
    width: '$15',
    height: '$15',
    // 임시지정ㄴ
    backgroundColor: '$white100',
    borderRadius: '100%',
  },

  'span:first-child': {
    animation: `0.6s ease-in-out 0.07s infinite ${jump}`,
  },

  'span:nth-child(2)': {
    animation: `0.6s ease-in-out 0.14s infinite ${jump}`,
  },

  'span:last-child': {
    animation: `0.6s ease-in-out 0.21s infinite ${jump}`,
  },
});
