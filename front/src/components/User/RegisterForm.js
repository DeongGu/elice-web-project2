import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import useValidation from '../../hooks/useValidation';

import ValidateInputList from './ValidateInputList';

const inputData = [
  {
    type: 'email',
    name: 'email',
    description: '이메일',
  },
  {
    type: 'text',
    name: 'nickname',
    description: '별명',
  },
  {
    type: 'password',
    name: 'password',
    description: '비밀번호',
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
  const {
    form,
    setForm,
    formIsValid,
    setFormIsValid,
    onSubmitHandler,
    isLoading,
  } = useForm(initialState, 'post', 'users/register');

  const { validateHandler } = useValidation(setForm, setFormIsValid);

  const inputProps = {
    inputData,
    validateHandler,
    form,
    formIsValid,
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <ValidateInputList {...inputProps} />
      <button>회원가입</button>
      {isLoading ? console.log('로딩 중') : ''}
    </form>
  );
}
