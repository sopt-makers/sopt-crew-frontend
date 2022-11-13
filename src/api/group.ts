import { Option } from '@components/Form/Select/OptionItem';
import { FormType } from 'src/types/form';
import { api } from '.';

export const createGroup = async (formData: FormType) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    // NOTE: category는 object 이므로 value만 가져온다.
    if (key === 'category') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      form.append(key, (value as Option).value!);
    }
    // NOTE: nested된 필드를 flat하게 만들어주자.
    else if (key === 'detail') {
      for (const [detailKey, value] of Object.entries(formData[key])) {
        if (value) {
          form.append(detailKey, value);
        }
      }
    } else if (key === 'files') {
      for (const file of formData[key] as File[]) {
        form.append('files', file);
      }
    }
    // NOTE: 다른 필드들은 그대로 주입
    else {
      form.append(key, value);
    }
  }

  const { data } = await api.post('/meeting', form);

  return data;
};

interface GetGroupByIdResponse {
  statusCode: number;
  data: {
    id: number;
    title: string;
    category: string;
    imageURL: string[]; // NOTE: id, url 필드가 담긴 stringified JSON
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
