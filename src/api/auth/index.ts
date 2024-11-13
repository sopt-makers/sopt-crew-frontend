import { paths } from '@/__generated__/schema2';
import { api } from '..';

type GetCrewTokenResponse = paths['/auth/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];

export const getCrewToken = async (playgroundToken: string) => {
  const { data } = await api.post<GetCrewTokenResponse>(`/auth/v2`, {
    authToken: playgroundToken,
  });
  return data;
};
