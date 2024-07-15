import { colors } from '@sopt-makers/colors';

export const parseTextToLink = (content: string) => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /(https?:\/\/[^\s\]\)]+)|(www\.[^\s\]\)]+)/g;
  const fragmentList = content.split(urlRegex);

  return fragmentList.map((fragment, index) => {
    if (urlRegex.test(fragment)) {
      const url = fragment.startsWith('https') ? fragment : `https://${fragment}`;
      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          {fragment}
        </a>
      );
    }

    const processString = () => {
      const regex = /-~!@#@(.*?)\[(\d+)\]%\^&\*\+/g;

      let matches;
      let lastIndex = 0;
      const content = [];

      // URL에서 호스트 부분 추출
      const host = window.location.origin;

      while ((matches = regex.exec(fragment)) !== null) {
        if (matches.index > lastIndex) {
          content.push(fragment.substring(lastIndex, matches.index));
        }

        content.push(
          <a href={host + '/members/' + matches[2]}>
            <p style={{ color: colors.success, display: 'inline' }}>@{matches[1]}</p>
          </a>
        );
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < fragment?.length) {
        content.push(fragment?.substring(lastIndex));
      }

      return content;
    };

    const finalContent = processString();

    return finalContent;
  });
};
