export function parseMention(value: string) {
  const removeBracketsAndNumbers = (value: string) => {
    const pattern = /-~!@#[^[]*\[\d+\][^%]*%\^&\*\+/g;
    return value.replace(pattern, match => {
      return match.replace(/\[\d+\]/, '');
    });
  };

  return removeBracketsAndNumbers(value).replace(/-~!@#|%\^&\*\+/g, '');
}
