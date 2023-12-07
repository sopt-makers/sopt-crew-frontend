import React from 'react';
import GroupIcon from '../../../public/assets/svg/floating_button_group_icon.svg';
import FeedIcon from '../../../public/assets/svg/floating_button_feed_icon.svg';
import { styled } from 'stitches.config';
import { keyframes } from 'stitches.config';

const FloatingButtonModal = (props: { isActive: boolean }) => {
  const { isActive } = props;
  return (
    <Container isActive={isActive}>
      <Button>
        <GroupIcon style={{ marginRight: '4px' }} />
        모임 개설
      </Button>
      <Button>
        <FeedIcon style={{ marginRight: '4px' }} />
        피드 작성
      </Button>
    </Container>
  );
};

export default FloatingButtonModal;

const fadeIn = keyframes({
  from: { opacity: '0', transform: 'translateY(7px)' },
  to: { opacity: '1', transform: 'translateY(0px)' },
});

const fadeOut = keyframes({
  from: { opacity: '1', transform: 'translateY(0px)' },
  to: { opacity: '0', transform: 'translateY(7px)' },
});

const Container = styled('div', {
  width: '160px',
  height: '112px',
  zIndex: '$3',
  position: 'absolute',
  bottom: '76px',
  right: '5%',
  backgroundColor: '$gray10',
  borderRadius: '20px',
  color: '$gray600',
  flexType: 'center',
  flexWrap: 'wrap',
  transition: 'all 0.3s ease',
  padding: '$8 $6 $8 $6',
  variants: {
    isActive: {
      true: {
        animation: `${fadeIn} 200ms ease-out`,
      },
      false: {
        animation: `${fadeOut} 200ms ease-out`,
        opacity: '0',
      },
    },
  },
  '@tablet': {
    width: '140px',
    height: '90px',
    borderRadius: '18px',
    bottom: '72px',
    padding: '$6 $0 $6 $4',
  },
});

const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '46px',
  paddingLeft: '12px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '22px',
  '&:hover': {
    borderRadius: '16px',
    backgroundColor: '$gray30',
  },
  '@tablet': {
    '&:hover': {
      backgroundColor: '$gray10',
    },
    height: '38px',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '18px',
  },
});