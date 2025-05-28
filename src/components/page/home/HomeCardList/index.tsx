import { useGetPropertyQueryOption } from '@api/property/hooks';
import CardList from '@components/page/home/HomeCardList/CardList';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

const HOME_PROPERTY_KEY = 'home';

const HomeCardList = () => {
  const { data: property } = useQuery(useGetPropertyQueryOption(HOME_PROPERTY_KEY));

  return (
    <SWrapper>
      <SGradationRight />
      {property?.map((prop: { title: string; meetingIds: number[] }, idx: number) => (
        <CardList key={idx} label={prop.title} meetingIds={prop.meetingIds} />
      ))}
    </SWrapper>
  );
};

export default HomeCardList;

const SWrapper = styled('div', {
  position: 'relative',
  width: '894px',

  '@laptop': {
    width: '100%',
  },
});

const SGradationRight = styled('div', {
  width: '122px',
  height: '100%',
  background: 'linear-gradient(270deg, #0F0F12 0%, rgba(15, 15, 18, 0.00) 100%)',

  position: 'absolute',
  right: '-1px',
  pointerEvents: 'none',

  '@media (min-width: 1259px)': {
    display: 'none',
  },
  '@media (max-width: 768px)': {
    display: 'none',
  },
});
