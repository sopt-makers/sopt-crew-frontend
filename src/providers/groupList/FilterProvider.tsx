import {
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { OptionType } from '@components/page/groupList/filter/Filter';
import { useEffect } from 'react';
import { NextRouter } from 'next/router';
import useLocalStorage from '@hooks/useLocalStorage';
import { useRouter } from 'next/router';

interface FilterContextProps {
  currentPageIndex: number;
  selectedFilterOptions: {
    category: string[];
    status: string[];
  };
  search: string;
  listType: string;
  changeCurrentPage: (index: number) => void;
  addFilterOptions: (category: string) => (value: string) => void;
  deleteFilterOptions: (category: string) => (value: string) => void;
  resetFilterOption: () => void;
  handleSearch: (word: string) => void;
  changeListType: (listType: string) => void;
}

export interface OptionStateType extends OptionType {
  category: string;
}

const FilterContext = createContext({
  currentPageIndex: 1,
  selectedFilterOptions: {
    category: [] as string[],
    status: [] as string[],
  },
  search: '',
  listType: 'all',
  changeCurrentPage: (index: number) => {
    console.log(index);
  },
  addFilterOptions: (category: string) => (value: string) => {
    console.log(category, value);
  },
  deleteFilterOptions: (category: string) => (value: string) => {
    console.log(category, value);
  },
  resetFilterOption: () => {},
  handleSearch: (word: string) => {
    console.log(word);
  },
  changeListType: (listType: string) => {
    console.log(listType);
  },
});

export function FilterProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [store, setStore] = useLocalStorage('filter', null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  // {category:['study','~~'],status:['ing,end']}
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [listType, setListType] = useState<string>('all');

  const changeCurrentPage = useCallback((index: number) => {
    setCurrentPageIndex(index);
  }, []);

  const addCategoryOptions = useCallback((value: string) => {
    setCategoryOptions(option => [...option, value]);
  }, []);

  const addStatusOptions = useCallback((value: string) => {
    setStatusOptions(option => [...option, value]);
  }, []);

  const deleteCategoryOption = useCallback(
    (value: string) => {
      const filteredOption = categoryOptions.filter(
        option => !(option === value)
      );
      setCategoryOptions(filteredOption);
    },
    [categoryOptions]
  );

  const deleteStatusOption = useCallback(
    (value: string) => {
      const filteredOption = statusOptions.filter(
        option => !(option === value)
      );
      setStatusOptions(filteredOption);
    },
    [statusOptions]
  );

  const addFilterOptions = (category: string) => (value: string) => {
    if (category === 'category') addCategoryOptions(value);
    if (category === 'status') addStatusOptions(value);
  };
  const deleteFilterOptions = (category: string) => (value: string) => {
    if (category === 'category') deleteCategoryOption(value);
    if (category === 'status') deleteStatusOption(value);
  };

  const resetFilterOption = useCallback(() => {
    setCategoryOptions([]);
    setStatusOptions([]);
  }, []);

  const handleSearch = useCallback((word: string) => {
    setSearch(word);
  }, []);

  const changeListType = useCallback((listType: string) => {
    setListType(listType);
  }, []);

  // TODO: queryString으로 기본값을 잡을 수 있게 셋팅
  //   useEffect(() => {
  //     if (Object.keys(router.query).length === 0) {
  //       setCurrentPageIndex(store?.page || 0);
  //       setCategoryOptions(store?.categoryOptions || []);
  //       setStatusOptions(store?.statusOptions || []);
  //       setSearch(store?.search || '');
  //       console.log(2);
  //     }
  //     if (Object.keys(router.query).length !== 0) {
  //       setCurrentPageIndex(Number(router.query?.page) || 0);
  //       setCategoryOptions(
  //         typeof router.query?.categoryOptions === 'string'
  //           ? [router.query?.categoryOptions]
  //           : router.query?.categoryOptions || []
  //       );
  //       setStatusOptions(
  //         typeof router.query?.statusOptions === 'string'
  //           ? [router.query?.statusOptions]
  //           : router.query?.statusOptions || []
  //       );
  //       setSearch((router.query?.search as string) || '');
  //     }
  //   }, []);

  useEffect(() => {
    const queryParams = {
      page: currentPageIndex,
      ...(categoryOptions.length !== 0 && {
        categoryOptions: categoryOptions,
      }),
      ...(statusOptions.length !== 0 && {
        statusOptions: statusOptions,
      }),
      ...(!!search && {
        search: search,
      }),
    };
    setStore(queryParams);
    router.push(
      {
        query: queryParams,
      },
      undefined,
      { shallow: true }
    );
  }, [currentPageIndex, categoryOptions, statusOptions, search, listType]);

  const value = useMemo(
    () => ({
      currentPageIndex,
      selectedFilterOptions: {
        category: categoryOptions,
        status: statusOptions,
      },
      search,
      listType,
      changeCurrentPage,
      addFilterOptions,
      deleteFilterOptions,
      resetFilterOption,
      handleSearch,
      changeListType,
    }),
    [currentPageIndex, categoryOptions, statusOptions, search, listType]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext<FilterContextProps>(FilterContext);
}
