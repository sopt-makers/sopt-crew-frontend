import { useRouter } from 'next/router';

export interface QueryStringType {
  [key: string]: string | string[] | undefined;
}

/* 
  -필터링은 쿼리 파라미터를 통해 진행-
  useQueryString : 단일 쿼리 설청을 위한 훅 
  useMultiQueryString : 복수 쿼리 설정을 위한 훅
*/
export function useQueryString(key: string, initValue?: string | null, withPage?: boolean) {
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
  const queryOfKey = query[key] as string | undefined; //하나의 key에 대한 value 설정(value가 여러개일 경우 ,로 구분)
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
  const setValue = (value: string[]) => {
    query[key] = value.join(',');
    if (value.length) return pushQuery(query);
    deleteKey();
  };
  const addValue = (value: string) => {
    //,(콤마)는 인코딩되면 %2C가 됨
    query[key] = [...splitQueryOfKey, value].join(',');
    pushQuery(query);
  };

  const deleteValue = (value: string) => {
    const deletedQueryData = splitQueryOfKey.filter((option: string) => option !== value).join(',');

    query[key] = deletedQueryData;
    if (!deletedQueryData) return deleteKey();
    pushQuery(query);
  };

  const deleteKey = () => {
    delete query[key];
    pushQuery(query);
  };
  return {
    value: splitQueryOfKey, // , 로 구분된 해당 key의 value들을 배열 형태로 반환
    setValue,
    addValue,
    deleteValue,
    deleteKey,
  };
}
