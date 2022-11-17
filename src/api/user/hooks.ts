import { useQuery } from '@tanstack/react-query';
import { fetchGroupListOfApplied, fetchGroupListOfMine } from '.';

export const useQueryGroupListOfApplied = () =>
  useQuery(['fetchGroupListOfApplied'], fetchGroupListOfApplied, {
    select: response => response.data.data,
    suspense: true,
  });

export const useQueryGroupListOfMine = () =>
  useQuery(['fetchGroupListOfMine'], fetchGroupListOfMine, {
    select: response => response.data.data,
    suspense: true,
  });
