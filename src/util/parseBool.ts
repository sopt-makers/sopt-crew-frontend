export function parseBool(val: string | boolean | undefined | null) {
  return val === true || val === 'true';
}
