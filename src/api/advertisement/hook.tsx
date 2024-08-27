import { useQuery } from '@tanstack/react-query';
import { getMeetingAds, getPostAds } from '.';

export const useGetPostAds = () => {
  return useQuery({
    queryKey: ['getPostAds'],
    queryFn: () => getPostAds(),
    select: res => res,
  });
};

export const useGetMeetingAds = () => {
  return useQuery({
    queryKey: ['getMeetingAds'],
    queryFn: () => getMeetingAds(),
    select: res => res,
  });
};
