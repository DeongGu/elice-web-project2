import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserCheckContext from '../../context/UserCheckContext';

import RegisterForm from '../User/RegisterForm';
import LoginForm from '../User/LoginForm';
import EditForm from '../User/EditForm';
import DeleteForm from '../User/DeleteForm';

const Main = () => {
  const userCheck = useContext(UserCheckContext);
  const navigate = useNavigate();

  return (
    <>
      <RegisterForm />
      <LoginForm />
      {userCheck.user && (
        <button
          onClick={() => {
            navigate('/users');
          }}
        >
          유저 정보
        </button>
      )}
    </>
  );
};

export default Main;
