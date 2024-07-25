export const parseMentionedUserIds = (inputString: string) => {
  const regex = /-~!@#@[^[\]]+\[(\d+)\]%\^&\*\+/g;
  const numbers: number[] | null = [];
  let match;

  while ((match = regex.exec(inputString)) !== null) {
    numbers.push(Number(match[1]));
  }
  return numbers;
};
