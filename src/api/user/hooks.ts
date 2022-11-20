import { useQuery } from '@tanstack/react-query';
import { fetchGroupListOfApplied, fetchGroupListOfMine } from '.';

export const useQueryGroupListOfApplied = () =>
  useQuery(['fetchGroupList', 'apply'], fetchGroupListOfApplied, {
    select: response => response.data.data,
    suspense: true,
  });

export const useQueryGroupListOfMine = () =>
  useQuery(['fetchGroupList', 'mine'], fetchGroupListOfMine, {
    select: response => response.data.data,
    suspense: true,
  });
