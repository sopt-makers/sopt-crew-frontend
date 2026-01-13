import { FormType } from '@domain/map/Form/type';
import { useMutation } from '@tanstack/react-query';
import { postSoptMap } from '.';
import { serializeSoptMapData } from './serialize';

export const usePostSoptMapMutation = () => {
  return useMutation({
    mutationFn: (formData: FormType) => postSoptMap(serializeSoptMapData(formData)),
    onError: () => {
      alert('솝맵을 등록하지 못했습니다.');
    },
  });
};
