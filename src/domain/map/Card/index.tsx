import { useDisplay } from '@hook/useDisplay';
import { styled } from 'stitches.config';
import DesktopMapCard from './DesktopMapCard';
import MobileMapCard from './MobileMapCard';

const MapCard = () => {
  const { isDesktop } = useDisplay();
  return <CardWrapper>{isDesktop ? <DesktopMapCard /> : <MobileMapCard />}</CardWrapper>;
};

export default MapCard;

const CardWrapper = styled('li', {
  width: '100%',
});
