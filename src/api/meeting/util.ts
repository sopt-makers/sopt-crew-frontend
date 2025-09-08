import { PART_OPTIONS, PART_VALUES } from '@constant/option';

export function parseStatusToNumber(status: string, statusArray: string[]) {
  const statusIdx = statusArray.findIndex(item => item === status);
  if (statusIdx >= 0) return statusIdx;
  return null;
}

export function parsePartLabelToValue(part: string) {
  const partIdx = PART_OPTIONS.findIndex(option => option === part);
  if (partIdx >= 0) return PART_VALUES[partIdx];
  return null;
}

export function parsePartValueToLabel(part: string) {
  const partIdx = PART_VALUES.findIndex(option => option === part);
  if (partIdx >= 0) return PART_OPTIONS[partIdx];
  return null;
}
