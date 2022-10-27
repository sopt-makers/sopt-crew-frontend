import { styled } from 'stitches.config';
import React from 'react';

interface HelpMessageProps {
  children?: React.ReactNode;
}

const HelpMessage = ({ children }: HelpMessageProps) => {
  return <SHelpMessage>{children}</SHelpMessage>;
};

export default HelpMessage;

const SHelpMessage = styled('span', {
  marginBottom: 18,
  display: 'inline-block',
  fontAg: '14_medium_100',
  color: '$gray100',
});
