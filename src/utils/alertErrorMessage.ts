import { AxiosError, AxiosResponse } from 'axios';

const alertErrorMessage = (error: AxiosError) => {
  const errorResponse = error.response as AxiosResponse;
  alert(errorResponse.data.message);
};

export default alertErrorMessage;
