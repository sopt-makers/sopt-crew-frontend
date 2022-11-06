/**
 * 전체 page의 length를 받아, pagination의 배열로 만들어 리턴해주는 함수입니다.
 *
 * ex)
 *
 * pageLength = 10;
 *
 * returns [ [1,2,3,4,5], [6,7,8,9,10] ]
 * @param pageLength
 * @returns number[][]
 *
 */

export function bindThePages(pageLength: number): number[][] {
  const listAllPages = Array.from({ length: pageLength }, (v, i) => i + 1);
  let i, j;
  const bundleOfPages = [];
  const chunkSize = 5;
  for (i = 0, j = pageLength; i < j; i += chunkSize) {
    bundleOfPages.push(listAllPages.slice(i, i + chunkSize));
  }
  return bundleOfPages;
}
