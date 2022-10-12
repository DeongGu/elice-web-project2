import useForm from '../../hooks/useForm';

import InputList from './InputList';

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
  const { form, onChangeHandler, onSubmitHandler } = useForm(
    initialState,
    'get',
    'users/profile/'
  );

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>로그인</button>
    </form>
  );
}
