import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import useBooleanState from '@hooks/useBooleanState';

interface SelectListVisionContextProps {
  isSelectListVisible: {
    category: boolean;
    status: boolean;
  };
  onDismissSelectList: (category: string) => void;
  toggleSelectList: (category: string) => void;
}

const SelectListVisionContext = createContext({
  isSelectListVisible: {
    category: false,
    status: false,
  },
  onDismissSelectList: (category: string) => {
    console.log(category);
  },
  toggleSelectList: (category: string) => {
    console.log(category);
  },
});

export function SelectListVisionProvider({ children }: PropsWithChildren) {
  const {
    bool: isCategoryListVisible,
    setFalse: categoryListSetFalse,
    toggle: categoryListToggle,
  } = useBooleanState();

  const {
    bool: isStatusListVisible,
    setFalse: statusSetFalse,
    toggle: statusListToggle,
  } = useBooleanState();

  const isSelectListVisible = useMemo(() => {
    return {
      category: isCategoryListVisible,
      status: isStatusListVisible,
    };
  }, [isCategoryListVisible, isStatusListVisible]);

  const onDismissSelectList = useCallback(
    (category: string) => {
      if (category === 'category') categoryListSetFalse();
      if (category === 'status') statusSetFalse();
    },
    [categoryListSetFalse, statusSetFalse]
  );

  const toggleSelectList = useCallback(
    (category: string) => {
      if (category === 'category') categoryListToggle();
      if (category === 'status') statusListToggle();
    },
    [categoryListToggle, statusListToggle]
  );

  const value = useMemo(
    () => ({
      isSelectListVisible,
      onDismissSelectList,
      toggleSelectList,
    }),
    [isSelectListVisible, onDismissSelectList, toggleSelectList]
  );

  return (
    <SelectListVisionContext.Provider value={value}>
      {children}
    </SelectListVisionContext.Provider>
  );
}

export function useSelectListVisionContext() {
  return useContext<SelectListVisionContextProps>(SelectListVisionContext);
}
