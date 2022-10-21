import { useContext } from "react";

import { UserContext } from "../../App";
import GeneralContext from "../../context/GeneralContext";

import NavBar from "./NavBar";
import Logo from "./Logo";
import LoginForm from "../User/LoginForm";
import RegisterForm from "../User/RegisterForm";
import DeleteForm from "../User/DeleteForm";
import EditForm from "../User/EditForm";
import UserForm from "../User/UserForm";

import styled from "styled-components";

export default function Header() {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const FormCheck = () => {
    if (generalContext.showLoginForm) {
      return <LoginForm />;
    } else if (generalContext.showRegisterForm) {
      return <RegisterForm />;
    } else if (generalContext.showEditForm) {
      return <EditForm />;
    } else if (generalContext.showDeleteForm) {
      return <DeleteForm />;
    } else if (generalContext.showUserForm) {
      return <UserForm />;
    }
  };

  return (
    !userContext.isLoading && (
      <>
        <FormCheck />
        <HeaderStyle>
          <Logo />
          <NavBar />
        </HeaderStyle>
      </>
    )
  );
}

const HeaderStyle = styled.header`
  height: 10vh;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
