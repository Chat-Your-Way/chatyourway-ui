import { createContext, useContext, useState } from 'react';

const Context = createContext(null);

export const SharedLayoutContextProvider = ({ children, ...props }) => {
  const contextValue = useCreateSharedLayoutContext(props);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useSharedLayoutContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('Use ShardLayout context within provider!');
  return useContext(Context);
};

export const useCreateSharedLayoutContext = (props) => {
  const [isCenterOrStart, setIsCenterOrStart] = useState(
    props.isCenterOrStart || false,
  );

  return { isCenterOrStart, setIsCenterOrStart };
};
