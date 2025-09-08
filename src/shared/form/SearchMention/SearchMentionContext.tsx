import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface SearchMentionProviderProps {
  children: React.ReactNode;
}

interface User {
  userName: string;
  userId: number;
}

interface SearchMentionContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

/*
  참고) SearchMentionContext는 공동모임장을 위한 context입니다. 
  혹시 나중에 사용할 일이 생길 수도 있을까봐 간단하게 구조만 작성해두었습니다.
*/

const SearchMentionContext = createContext<SearchMentionContextProps>({
  user: { userName: '', userId: 0 },
  setUser: () => {},
});

const SearchMentionProvider: React.FC<SearchMentionProviderProps> = ({ children }) => {
  const [user, setUser] = useState({ userName: '', userId: 0 });

  return <SearchMentionContext.Provider value={{ user, setUser }}>{children}</SearchMentionContext.Provider>;
};

export { SearchMentionContext, SearchMentionProvider };
