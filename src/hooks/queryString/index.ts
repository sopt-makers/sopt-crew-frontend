import { useRouter } from 'next/router';

export interface QueryStringType {
  [key: string]: string | string[] | undefined;
}

export function useQueryString(
  key: string,
  initValue?: string | null,
  withPage?: boolean
) {
  const router = useRouter();
  const query: QueryStringType = router?.query;

  const pushQuery = (queryData: QueryStringType) => {
    if (withPage) queryData['page'] = '1';

    router.push(
      {
        query: queryData,
      },
      undefined,
      { shallow: true }
    );
  };

  const setValue = (value: string | number) => {
    query[key] = String(value);
    pushQuery(query);
  };

  const deleteKey = () => {
    delete query[key];
    pushQuery(query);
  };

  return {
    value: (query[key] as string) || initValue,
    setValue,
    deleteKey,
  };
}

export function useMultiQueryString(key: string, withPage?: boolean) {
  const router = useRouter();
  const query: QueryStringType = router?.query;
  const queryOfKey = query[key] as string | undefined;
  const splitQueryOfKey = queryOfKey?.split(',') || [];

  const pushQuery = (queryData: QueryStringType) => {
    if (withPage) queryData['page'] = '1';

    router.push(
      {
        query: queryData,
      },
      undefined,
      { shallow: true }
    );
  };

  const addValue = (value: string) => {
    query[key] = [...splitQueryOfKey, value].join(',');
    pushQuery(query);
  };

  const deleteValue = (value: string) => {
    const deletedQueryData = splitQueryOfKey
      .filter((option: string) => option !== value)
      .join(',');

    query[key] = deletedQueryData;
    if (!deletedQueryData) {
      deleteKey();
    } else {
      pushQuery(query);
    }
  };

  const deleteKey = () => {
    delete query[key];
    pushQuery(query);
  };
  return {
    value: splitQueryOfKey,
    addValue,
    deleteValue,
    deleteKey,
  };
}
