import { FormType } from 'src/types/form';
import { api } from '.';

export const createGroup = async (formData: FormType) => {
  const response = await api.post('/meeting', {
    ...formData,
    ...formData.detail,
    category: formData.category.value,
    detail: undefined,
  });

  return response;
};
