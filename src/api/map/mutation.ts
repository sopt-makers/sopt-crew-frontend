import { FormType } from '@domain/map/Form/type';
import { useToast } from '@sopt-makers/ui';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import router from 'next/router';
import { deleteMap, postSoptMap, putMapRecommendation, putSoptMap } from '.';
import MapQueryKey from './MapQueryKey';
import { serializeSoptMapData } from './serialize';
import { GetMapList } from './type';
import { visitMapCache } from './util';

export const usePostSoptMapMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (formData: FormType) => postSoptMap(serializeSoptMapData(formData)),
    onSuccess: () => {
      open({
        icon: 'success',
        content: '장소를 등록했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: MapQueryKey.all() });
    },
    onError: () => {
      alert('이미 등록된 장소가 있습니다');
    },
  });
};

export const usePutSoptMapMutation = (soptMapId: number) => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (formData: FormType) => putSoptMap(serializeSoptMapData(formData), soptMapId),
    onSuccess: () => {
      open({
        icon: 'success',
        content: '장소를 수정했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: MapQueryKey.all() });
      router.push(`/map`);
    },
    onError: () => {
      alert('솝맵을 수정하지 못했습니다.');
    },
  });
};

export const useDeleteMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mapId: number) => deleteMap(mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MapQueryKey.all() });
    },
  });
};

type MapCacheData = InfiniteData<GetMapList['response']> | GetMapList['response'];

export const useRecommendMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mapId: number) => putMapRecommendation(mapId),

    onMutate: async targetMapId => {
      await queryClient.cancelQueries({ queryKey: MapQueryKey.all() });

      const previousData = queryClient.getQueriesData({ queryKey: MapQueryKey.all() });

      queryClient.setQueriesData<MapCacheData>({ queryKey: MapQueryKey.all() }, oldData => {
        if (!oldData) return undefined;

        return produce(oldData, draft => {
          visitMapCache(draft, soptMaps => {
            const target = soptMaps.find(map => map.id === targetMapId);
            if (target) {
              target.isRecommended = !target.isRecommended;
              target.recommendCount = (target.recommendCount ?? 0) + (target.isRecommended ? 1 : -1);
            }
          });
        });
      });

      return { previousData };
    },

    onError: (err, newTodo, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    // UX 개선을 위해 onSettled 제거
  });
};
