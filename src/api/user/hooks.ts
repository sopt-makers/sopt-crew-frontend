import { useQuery } from '@tanstack/react-query';
import { fetchMeetingListOfApplied, fetchMeetingListOfMine } from '.';

export const useQueryMeetingListOfApplied = () =>
  useQuery(['fetchMeetingList', 'apply'], fetchMeetingListOfApplied, {
    select: response => response.data.data,
    suspense: true,
  });

export const useQueryMeetingListOfMine = () =>
  useQuery(['fetchMeetingList', 'mine'], fetchMeetingListOfMine, {
    select: response => response.data.data,
    suspense: true,
  });
