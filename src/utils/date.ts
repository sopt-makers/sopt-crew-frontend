/**
 * Formats a date string to a more readable format
 * 20010101 -> 2001.01.01
 * @param rawValue
 */

export const MAX_DATE_INPUT_LENGTH = 8;

export const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export const formatDateInput = (rawValue: string): string => {
  let formattedValue = '';

  if (rawValue.length > 0) formattedValue += rawValue.substring(0, 4);
  if (rawValue.length > 4) formattedValue += '.' + rawValue.substring(4, 6);
  if (rawValue.length > 6) formattedValue += '.' + rawValue.substring(6, 8);

  return formattedValue;
};
