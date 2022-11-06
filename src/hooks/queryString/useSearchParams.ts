import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

export interface SearchQueryString {
  search?: string;
}

const useSearchParams = () => {
  const router = useRouter();
  const query: SearchQueryString = router?.query;
  const setSearch = (value: string) => {
    const query: SearchQueryString = {
      ...router.query,
      search: value,
    };
    if (!value.search) {
      delete query.search;
    }
    router.push(
      {
        query: query as ParsedUrlQueryInput,
      },
      undefined,
      { shallow: true }
    );
  };

  return {
    search: query?.search || '',
    setSearch,
  };
};

export default useSearchParams;
