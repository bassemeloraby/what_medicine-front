import React, { useContext } from 'react';





const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [admin, setAdmin] = React.useState(false);
  const [adminOpen, setAdminOpen] = React.useState(false);

  //move to administrators
  const asAdmin = () => {
    setAdmin(true);
  };
  //move to users
  const asUser = () => {
    setAdminOpen(false);
  };


  
  

  return (
    <AppContext.Provider
      value={{
        asAdmin,
        asUser,
        adminOpen,
        admin,
        setAdmin,
        setAdminOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
