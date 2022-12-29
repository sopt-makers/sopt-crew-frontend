import { api, Data } from '..';

interface GetCrewTokenResponse {
  accessToken: string;
}

export const getCrewToken = async (playgroundToken: string) => {
  const {
    data: { data },
  } = await api.post<Data<GetCrewTokenResponse>>(`/auth`, {
    authToken: playgroundToken,
  });
  return data;
};
