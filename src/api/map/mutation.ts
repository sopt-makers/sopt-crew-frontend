import { FormType } from '@domain/map/Form/type';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deleteMap, postSoptMap, putMapRecommendation } from '.';
import MapQueryKey from './MapQueryKey';
import { serializeSoptMapData } from './serialize';
import { GetMapList } from './type';
import { visitMapCache } from './util';

export const usePostSoptMapMutation = () => {
  return useMutation({
    mutationFn: (formData: FormType) => postSoptMap(serializeSoptMapData(formData)),
    onError: () => {
      alert('솝맵을 등록하지 못했습니다.');
    },
  });
};

export const useDeleteMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mapId: number) => deleteMap(mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MapQueryKey.list() });
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
