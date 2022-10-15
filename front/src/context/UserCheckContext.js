import React, { useState } from 'react';

const UserCheckContext = React.createContext({
  user: {},
  setUser: () => {},
});

export const UserCheckContextProvider = (props) => {
  const [user, setUser] = useState('');

  const contextValues = {
    user,
    setUser,
  };

  return (
    <UserCheckContext.Provider value={contextValues}>
      {props.children}
    </UserCheckContext.Provider>
  );
};

export default UserCheckContext;
