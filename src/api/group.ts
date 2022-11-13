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

interface GetGroupByIdResponse {
  statusCode: number;
  data: {
    id: number;
    title: string;
    category: string;
    imageURL: string[];
    startDate: string;
    endDate: string;
    capacity: number;
    desc: string;
    processDesc: string;
    mStartDate: string;
    mEndDate: string;
    leaderDesc: string;
    targetDesc: string;
    note: string | null;
    user: string | number | null;
    appliedInfo: string[];
  };
}

export const getGroupById = async (groupId: string) => {
  const { data } = await api.get<GetGroupByIdResponse>(`/meeting/${groupId}`);

  return data;
};

export const updateGroup = async (groupId: string, formData: FormType) => {
  const response = await api.put(`/meeting/${groupId}`, {
    ...formData,
    ...formData.detail,
    category: formData.category.value,
    detail: undefined,
  });

  return response;
};
