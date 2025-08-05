import { paths } from '@/__generated__/schema2';
import { baseApi } from '@api/index';

export const getCrewToken = async (playgroundToken: string) => {
  const response = await baseApi.post<
    paths['/auth/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8']
  >(
    '/auth/v2',
    {},
    {
      headers: {
        Authorization: `Bearer ${playgroundToken}`,
      },
    }
  );
  return response.data;
};
