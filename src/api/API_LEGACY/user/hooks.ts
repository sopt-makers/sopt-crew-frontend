import { useQuery } from '@tanstack/react-query';
import { fetchMeetingListOfApplied, fetchMeetingListOfMine, fetchMyProfile } from '.';

export const useQueryMeetingListOfApplied = () =>
  useQuery(['fetchMeetingList', 'apply'], fetchMeetingListOfApplied, {
    select: response => response.data,
    suspense: true,
  });

export const useQueryMeetingListOfMine = () =>
  useQuery(['fetchMeetingList', 'mine'], fetchMeetingListOfMine, {
    select: response => response.data,
    suspense: true,
  });

export const useQueryMyProfile = () => {
  return useQuery(['fetchMyProfile'], fetchMyProfile, {
    select: response => response.data.data,
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};
