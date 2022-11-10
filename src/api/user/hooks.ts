import { useQuery } from '@tanstack/react-query';
import { fetchGroupListOfApplied, fetchGroupListOfMine } from '.';

export const useGroupListOfApplied = () =>
  useQuery(['fetchGroupListOfApplied'], fetchGroupListOfApplied, {
    select: response => response.data.data,
  });

export const useGroupListOMine = () =>
  useQuery(['fetchGroupListOfMine'], fetchGroupListOfMine, {
    select: response => response.data.data,
  });
