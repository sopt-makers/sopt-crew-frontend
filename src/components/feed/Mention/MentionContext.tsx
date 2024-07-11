import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface MentionProviderProps {
  children: React.ReactNode;
}

interface User {
  userName: string;
  userId: number;
}

interface MentionContextProps {
  isReCommentClicked: boolean;
  setIsReCommentClicked: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const MentionContext = createContext<MentionContextProps>({
  isReCommentClicked: false,
  setIsReCommentClicked: () => {},
  user: { userName: '', userId: '' },
  setUser: () => {},
});

const MentionProvider: React.FC<MentionProviderProps> = ({ children }) => {
  const [isReCommentClicked, setIsReCommentClicked] = useState(false);
  const [user, setUser] = useState({ userName: '', userId: 0 });

  return (
    <MentionContext.Provider value={{ isReCommentClicked, setIsReCommentClicked, user, setUser }}>
      {children}
    </MentionContext.Provider>
  );
};

export { MentionContext, MentionProvider };
