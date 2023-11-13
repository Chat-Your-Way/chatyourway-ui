import { useContext, createContext, useState } from 'react';

const Context = createContext(null);

export const TopicsPageContextProvider = ({ children, ...props }) => {
  const context = useCreateTopicsPageContext(props);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useTopicsPageContext() {
  const context = useContext(Context);
  if (!context) throw new Error('Use TopicsPage context within provider!');
  return context;
}

export const useCreateTopicsPageContext = function (props) {
  const [contactsOpen, setContactsOpen] = useState(props.contactsOpen || false);

  return {
    contactsOpen,
    setContactsOpen,
  };
};
