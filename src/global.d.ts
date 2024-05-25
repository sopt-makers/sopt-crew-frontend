interface Kakao {
  init: (apiKey: string) => void;
  Channel: {
    chat: (options: { channelPublicId: string }) => void;
  };
}

interface Window {
  Kakao?: Kakao;
}
