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

const SearchMentionContext = createContext<SearchMentionContextProps>({
  user: { userName: '', userId: 0 },
  setUser: () => {},
});

const SearchMentionProvider: React.FC<SearchMentionProviderProps> = ({ children }) => {
  const [user, setUser] = useState({ userName: '', userId: 0 });

  return <SearchMentionContext.Provider value={{ user, setUser }}>{children}</SearchMentionContext.Provider>;
};

export { SearchMentionContext, SearchMentionProvider };
