import { useContext } from 'react';
import styled from 'styled-components';

import GeneralContext from '../../context/GeneralContext';

import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import useValidation from '../../hooks/useValidation';

import ValidateInputList from './ValidateInputList';
import ModalBackground from '../UI/ModalBackground';
import BreakLine from '../UI/BreakLine';

import LogoImage from '../../assets/images/Vring-logo.png';

import { REGISTER_USER } from '../../api/endpoints';

const inputData = [
  {
    type: 'email',
    name: 'email',
    description: '이메일',
    alert: '이메일 형식에 맞춰 주세요.',
  },
  {
    type: 'text',
    name: 'nickname',
    description: '별명',
    alert: '4 ~ 16자, 영문, 한글 혹은 숫자여야 합니다.',
  },
  {
    type: 'password',
    name: 'password',
    description: '비밀번호',
    alert: '6자 이상, 영문 및 숫자 조합이어야 합니다.',
  },
  {
    type: 'password',
    name: 'confirmPwd',
    description: '비밀번호 확인',
  },
];

const initialState = {
  email: '',
  nickname: '',
  password: '',
  confirmPwd: '',
};

export default function RegisterForm() {
  const generalContext = useContext(GeneralContext);
  const { form, setForm, formIsValid, setFormIsValid } = useForm(initialState);
  const { validateHandler } = useValidation(setForm, setFormIsValid);
  const { requestHandler, error } = useRequest(REGISTER_USER, '', {
    email: form.email,
    password: form.password,
    nickname: form.nickname,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
    setForm(initialState);
    setFormIsValid(initialState);
  };

  const changeFormHandler = () => {
    generalContext.disableFormHandler();
    generalContext.loginFormHandler();
  };

  const inputProps = {
    inputData,
    form,
    formIsValid,
    validateHandler,
  };

  return (
    <>
      <ModalBackground />
      <Form onSubmit={onSubmitHandler}>
        <Title>환영합니다!</Title>
        <ValidateInputList {...inputProps} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button
          disabled={
            !(
              form.email &&
              form.password &&
              form.confirmPwd &&
              form.nickname
            ) ||
            !(
              formIsValid.email &&
              formIsValid.password &&
              formIsValid.nickname
            ) ||
            form.password !== form.confirmPwd
          }
        >
          회원가입
        </Button>
        <BreakLine />
        <Text onClick={changeFormHandler}>
          이미 <TextColor>아이디</TextColor>가 있으신가요?
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
