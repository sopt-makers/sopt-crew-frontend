import { Box } from '@components/box/Box';
import { SyncLoader } from 'react-spinners';
import { styled } from 'stitches.config';

const Loader = () => {
  return (
    <SLoaderWrapper>
      <SyncLoader color="#8040ff" />
    </SLoaderWrapper>
  );
};

export default Loader;

const SLoaderWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
});
