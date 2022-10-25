export function paginationDivision(pageLength: number) {
  const pageLengthArray = Array.from({ length: pageLength }, (v, i) => i + 1);
  let i,
    j,
    temparray = [],
    chunk = 5;
  for (i = 0, j = pageLength; i < j; i += chunk) {
    temparray.push(pageLengthArray.slice(i, i + chunk));
  }
  return temparray;
}
