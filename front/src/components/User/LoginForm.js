import { useContext } from 'react';
import styled from 'styled-components';

import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';

import GeneralContext from '../../context/GeneralContext';

import InputList from './InputList';
import ModalBackground from '../UI/ModalBackground';
import BreakLine from '../UI/BreakLine';

import LogoImage from '../../assets/images/Vring-logo.png';

import { LOGIN_USER } from '../../api/endpoints';

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

export default function LoginForm() {
  const generalContext = useContext(GeneralContext);
  const { form, setForm, onChangeHandler } = useForm(initialState);
  const { requestHandler, error } = useRequest(LOGIN_USER, form);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
    setForm(initialState);
  };

  const changeFormHandler = () => {
    generalContext.disableFormHandler();
    generalContext.registerFormHandler();
  };

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <>
      <ModalBackground />
      <Form onSubmit={onSubmitHandler}>
        <Title>어서오세요!</Title>
        <InputList {...inputProps} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button disabled={!(form.email && form.password)}>로그인</Button>
        <BreakLine />
        <Text onClick={changeFormHandler}>
          <TextColor>아이디</TextColor>가 없으신가요?
        </Text>
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

const Text = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-top: 1rem;
  font-size: 1rem;
  font-family: elice-bold;
`;

const ErrorMsg = styled.div`
  font-size: 1rem;
  color: red;
`;

const TextColor = styled.span`
  color: #77bb3f;
  font-family: elice-bold;
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
  font-family: elice-bold;
`;

const Logo = styled.img`
  align-self: center;
  width: 6rem;
`;
