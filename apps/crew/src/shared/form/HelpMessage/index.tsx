import { fontsObject } from '@sopt-makers/fonts';
import React from 'react';
import { styled } from 'stitches.config';

interface HelpMessageProps {
  children?: React.ReactNode;
}

const HelpMessage = ({ children }: HelpMessageProps) => {
  return <SHelpMessage>{children}</SHelpMessage>;
};

export default HelpMessage;

const SHelpMessage = styled('span', {
  marginBottom: 8,
  display: 'inline-block',
  ...fontsObject.LABEL_4_12_SB,
  color: '$gray300',
});
