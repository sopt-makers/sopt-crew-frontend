import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface MentionProviderProps {
  children: React.ReactNode;
}

interface User {
  userName: string;
  userId: number;
}

interface ParentComment {
  parentComment: boolean;
  parentCommentId?: number;
}

interface MentionContextProps {
  isReCommentClicked: boolean;
  setIsReCommentClicked: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  parentComment: ParentComment;
  setParentComment: Dispatch<SetStateAction<ParentComment>>;
}

const MentionContext = createContext<MentionContextProps>({
  isReCommentClicked: false,
  setIsReCommentClicked: () => {},
  user: { userName: '', userId: 0 },
  setUser: () => {},
  parentComment: { parentComment: true },
  setParentComment: () => {},
});

const MentionProvider: React.FC<MentionProviderProps> = ({ children }) => {
  const [isReCommentClicked, setIsReCommentClicked] = useState(false);
  const [user, setUser] = useState({ userName: '', userId: 0 });
  const [parentComment, setParentComment] = useState({ parentComment: true });

  return (
    <MentionContext.Provider
      value={{ isReCommentClicked, setIsReCommentClicked, user, setUser, parentComment, setParentComment }}
    >
      {children}
    </MentionContext.Provider>
  );
};

export { MentionContext, MentionProvider };
