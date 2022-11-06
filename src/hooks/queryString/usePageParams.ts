import { useRouter } from 'next/router';

interface PageQueryString {
  page?: string;
}

const usePageParams = () => {
  const router = useRouter();
  const query: PageQueryString = router?.query;

  const setPage = (value: number) => {
    router.push(
      {
        query: {
          ...router.query,
          page: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return {
    page: Number(query?.page) || 1,
    setPage,
  };
};

export default usePageParams;
