import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ModalBackground = () => {
  return <SModalBackground />;
};

export default ModalBackground;

const SModalBackground = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1',
  width: '100%',
  height: '100%',
  backgroundColor: '$black80_trans',
});
