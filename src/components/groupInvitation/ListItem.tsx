import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ListItem = () => {
  return <SListItem></SListItem>;
};

export default ListItem;

const SListItem = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});
