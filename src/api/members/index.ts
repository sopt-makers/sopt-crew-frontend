import { playgroundApi } from '..';
import { Member } from './type';

// 자신의 토큰으로 조회
export const getMemberOfMe = async () => {
  const data = await playgroundApi.request<Member>({
    method: 'GET',
    url: `api/v1/members/me`,
  });

  return data.data;
};
