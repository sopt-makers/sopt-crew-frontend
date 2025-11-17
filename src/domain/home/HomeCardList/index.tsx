import { usePropertyQueryOption } from '@api/property/hooks';
import Loader from '@common/loader/Loader';
import { isProduction } from '@constant/environment';
import CardList from '@domain/home/HomeCardList/CardList';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

const HOME_PROPERTY_KEY = 'home';

const HomeCardList = () => {
  const { data: property } = useSuspenseQuery(usePropertyQueryOption(HOME_PROPERTY_KEY));

  return (
    <SWrapper>
      {property?.map((prop: { title: string; meetingIds: number[] }, idx: number) => (
        <CardList key={idx} label={prop.title} meetingIds={isProduction ? prop.meetingIds : [540, 667, 645]} />
      ))}
    </SWrapper>
  );
};

export default () => {
  return (
    <Suspense fallback={<Loader />}>
      <HomeCardList />
    </Suspense>
  );
};

const SWrapper = styled('div', {
  position: 'relative',
  width: '894px',

  '@laptop': {
    width: '100%',
  },
});
