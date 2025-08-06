import { paths } from '@/__generated__/schema2';
import { baseApi } from '@api/index';
import { redirectToLoginPage } from '@components/util/auth';

export const validateAuthToken = async (authToken: string) => {
  try {
    await baseApi.post<paths['/auth/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8']>(
      '/auth/v2',
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return true;
  } catch {
    alert('계정 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
    redirectToLoginPage();
    return false;
  }
};
