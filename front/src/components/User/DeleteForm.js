import { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';

import InputList from './InputList';
import ModalBackground from '../UI/ModalBackground';
import BreakLine from '../UI/BreakLine';

import LogoImage from '../../assets/images/Vring-logo.png';

import { DELETE_USER, LOGIN_USER } from '../../api/endpoints';

const inputData = [
  {
    type: 'email',
    name: 'email',
    description: '이메일',
  },
  {
    type: 'password',
    name: 'password',
    description: '비밀번호',
  },
];

const initialState = {
  email: '',
  password: '',
};

export default function DeleteForm() {
  const { form, onChangeHandler } = useForm(initialState);
  const userContext = useContext(UserContext);
  const { requestHandler: deleteUserHandler } = useRequest(DELETE_USER);
  const { requestHandler: checkUserHandler, error } = useRequest(
    LOGIN_USER,
    form
  );

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { error } = await checkUserHandler();

      if (error) {
        return;
      }

      await deleteUserHandler();

      navigate('/');

      sessionStorage.clear();
      userContext.setUser(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <>
      <ModalBackground />
      <Form onSubmit={onSubmitHandler}>
        <Title>정말 삭제하시나요?</Title>
        <InputList {...inputProps} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button disabled={!(form.email && form.password)}>삭제</Button>
        <BreakLine />
        <Logo src={LogoImage} />
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: 50rem;
  background-color: white;
  border: lightgray 1px solid;
  border-radius: 20px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const ErrorMsg = styled.div`
  font-size: 1rem;
  color: red;
`;

const Button = styled.button`
  cursor: pointer;
  margin-top: 2rem;
  width: 50%;
  height: 3rem;
  background-color: ${({ disabled }) => (disabled ? 'lightgray' : '#77bb3f')};
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.25rem;
`;

const Logo = styled.img`
  align-self: center;
  width: 6rem;
`;
