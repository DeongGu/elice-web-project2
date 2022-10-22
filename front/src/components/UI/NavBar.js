import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../App';
import GeneralContext from '../../context/GeneralContext';

import UserIcon from './UserIcon';

export default function NavBar() {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const navigate = useNavigate();

  const LoginCheck = () => {
    if (userContext.user) {
      return (
        <>
          <CreateButton onClick={() => navigate('/items')}>
            상품 등록
          </CreateButton>
          <UserIcon />
        </>
      );
    }

    return (
      <>
        <ListElement onClick={generalContext.loginFormHandler}>
          로그인
        </ListElement>
        <StartButton onClick={generalContext.registerFormHandler}>
          시작하기
        </StartButton>
      </>
    );
  };

  return (
    <Nav>
      <NavList>
        <ListElement onClick={() => navigate('/about')}>소개</ListElement>
        <ListElement onClick={() => navigate('/')}>마켓</ListElement>
        <LoginCheck />
      </NavList>
    </Nav>
  );
}

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const ListElement = styled.li`
  cursor: pointer;
  margin-right: 2rem;
  padding: 4px 16px;
`;

const StartButton = styled(ListElement)`
  cursor: pointer;
  padding: 4px 16px;
  font-size: 1.25rem;
  font-family: 'elice-bold';
  color: white;
  background-color: #77bb3f;
  border: #77bb3f 1px solid;
  border-radius: 20px;
  margin-right: 3rem;
`;

const CreateButton = styled(StartButton)`
  margin-right: 2rem;
`;
