import React, { useState } from 'react';

const UserCheckContext = React.createContext({
  userList: [],
  setUserList: () => {},
  user: {},
  setUser: () => {},
});

export const UserCheckContextProvider = (props) => {
  const [userList, setUserList] = useState('');
  const [user, setUser] = useState('');

  const contextValues = {
    userList,
    setUserList,
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
