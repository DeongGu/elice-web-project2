import { createContext, useState } from 'react';

const GeneralContext = createContext({
  showRegisterForm: false,
  showLoginForm: false,
  showEditForm: false,
  showDeleteForm: false,
  showAboutForm: false,
  showUserForm: false,
  registerFormHandler: () => {},
  loginFormHandler: () => {},
  editFormHandler: () => {},
  deleteFormHandler: () => {},
  disableFormHandler: () => {},
  userFormHandler: () => {},
  disableUserFormHandler: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showAboutForm, setShowAboutForm] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);

  const registerFormHandler = () => {
    setShowRegisterForm((prevState) => !prevState);
  };

  const loginFormHandler = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const editFormHandler = () => {
    setShowEditForm((prevState) => !prevState);
  };

  const deleteFormHandler = () => {
    setShowDeleteForm((prevState) => !prevState);
  };

  const userFormHandler = () => {
    setShowUserForm((prevState) => !prevState);
  };

  const disableFormHandler = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowEditForm(false);
    setShowDeleteForm(false);
    setShowAboutForm(false);
  };

  const disableUserFormHandler = () => {
    setShowUserForm(false);
  };

  const contextValues = {
    showLoginForm,
    showRegisterForm,
    showEditForm,
    showDeleteForm,
    showAboutForm,
    showUserForm,
    registerFormHandler,
    loginFormHandler,
    editFormHandler,
    deleteFormHandler,
    disableFormHandler,
    userFormHandler,
    disableUserFormHandler,
  };

  return (
    <GeneralContext.Provider value={contextValues}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
