import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';

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
  const { form, setForm, onChangeHandler } = useForm(initialState);
  const { requestHandler, isLoading } = useRequest(
    'post',
    'users/login',
    '',
    form
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
    setForm(initialState);
  };

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>로그인</button>
    </form>
  );
}
