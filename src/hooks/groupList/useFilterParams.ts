import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

export interface FilterQueryString {
  category?: string;
  status?: string;
}

const useFilterParams = () => {
  const router = useRouter();
  const query: FilterQueryString = router?.query;
  const categoryQuery = query['category'];
  const categoryQuerySplit = categoryQuery?.split(',') || [];
  const statusQuery = query['status'];
  const statusQuerySplit = statusQuery?.split(',') || [];

  const addCategoryOptions = (value: string) => {
    router.push(
      {
        query: {
          ...router.query,
          category: [...categoryQuerySplit, value].join(','),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const deleteCategoryOptions = (value: string) => {
    const categoryParams = categoryQuerySplit
      .filter((option: string) => option !== value)
      .join(',');
    const query: FilterQueryString = {
      ...router.query,
      category: categoryParams,
    };
    if (!query.category) {
      delete query.category;
    }
    router.push(
      {
        query: query as ParsedUrlQueryInput,
      },
      undefined,
      { shallow: true }
    );
  };

  const addStatusOptions = (value: string) => {
    router.push(
      {
        query: {
          ...router.query,
          status: [...statusQuerySplit, value].join(','),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const deleteStatusOptions = (value: string) => {
    const statusParams = statusQuerySplit
      .filter((option: string) => option !== value)
      .join(',');
    const query: FilterQueryString = {
      ...router.query,
      status: statusParams,
    };
    if (!query.status) {
      delete query.status;
    }
    router.push(
      {
        query: query as ParsedUrlQueryInput,
      },
      undefined,
      { shallow: true }
    );
  };

  const addFilterOptions = (category: string) => (value: string) => {
    if (category === 'category') addCategoryOptions(value);
    if (category === 'status') addStatusOptions(value);
  };
  const deleteFilterOptions = (category: string) => (value: string) => {
    if (category === 'category') deleteCategoryOptions(value);
    if (category === 'status') deleteStatusOptions(value);
  };
  const resetFilterOptions = () => {
    const query: FilterQueryString = {
      ...router.query,
    };

    delete query.status;
    delete query.category;

    router.push(
      {
        query: query as ParsedUrlQueryInput,
      },
      undefined,
      { shallow: true }
    );
  };

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
    category: categoryQuerySplit,
    status: statusQuerySplit,
    addFilterOptions,
    deleteFilterOptions,
    resetFilterOptions,
  };
};

export default useFilterParams;
