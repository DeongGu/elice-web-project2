import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import useValidation from '../../hooks/useValidation';

import { EDIT_USER, LOGIN_USER } from '../../api/endpoints';
import ModalBackground from '../UI/ModalBackground';
import BreakLine from '../UI/BreakLine';
import { UserContext } from '../../App';
import ValidateInputList from './ValidateInputList';

import LogoImage from '../../assets/images/Vring-logo.png';

const inputData = [
  {
    type: 'password',
    name: 'currentPassword',
    description: '현재 비밀번호',
  },
  {
    type: 'password',
    name: 'password',
    description: '새 비밀번호',
    alert: '6자 이상, 영문 및 숫자 조합이어야 합니다.',
  },
  {
    type: 'password',
    name: 'confirmNewPassword',
    description: '새 비밀번호 확인',
  },
];

const initialState = {
  currentPassword: '',
  password: '',
  confirmNewPassword: '',
};

export default function EditForm() {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const { form, setForm, formIsValid, setFormIsValid } = useForm(initialState);
  const { validateHandler } = useValidation(setForm, setFormIsValid);

  const { requestHandler: checkHandler, error } = useRequest(LOGIN_USER, {
    email: userContext.user.email,
    password: form.currentPassword,
  });

  const { requestHandler: editHandler } = useRequest(EDIT_USER, {
    password: form.password,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { error } = await checkHandler();

      if (error) {
        return;
      }

      await editHandler();

      navigate('/');

      sessionStorage.clear();
      userContext.setUser(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const inputProps = { inputData, form, formIsValid, validateHandler };

  return (
    <>
      <ModalBackground />
      <Form onSubmit={onSubmitHandler}>
        <Title>비밀번호 수정</Title>
        <ValidateInputList {...inputProps} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button
          disabled={
            !(
              form.currentPassword &&
              form.password &&
              form.confirmNewPassword
            ) ||
            form.password !== form.confirmNewPassword ||
            !formIsValid.password
          }
        >
          수정
        </Button>
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
