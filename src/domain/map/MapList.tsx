import MapCard from '@domain/map/Card/index';
import { usePageParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { styled } from 'stitches.config';
import Pagination from './Pagination';

const MapList = () => {
  const { isDesktop } = useDisplay();
  const { value: page, setValue: setPage } = usePageParams();
  return (
    <>
      <main>
        <SCardWrapper>
          {[...Array(10)].map((_, index) => (
            <MapCard key={index} />
          ))}
        </SCardWrapper>
      </main>
      {isDesktop && (
        <SPageWrapper>
          <Pagination totalPageLength={100} currentPage={Number(page)} onPageChange={setPage} />
        </SPageWrapper>
      )}
    </>
  );
};

const SCardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  mt: '$24',

  '@mobile': {
    mt: '$16',
    mb: '$40',
  },
});

const SPageWrapper = styled('div', {
  mt: '$120',
  mb: '$80',

  '@mobile': {
    mb: '$60',
  },
});

export default MapList;
