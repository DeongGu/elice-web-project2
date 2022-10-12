import useForm from '../../hooks/useForm';
import FormInputList from './FormInputList';

const formInputData = [
  {
    type: 'email',
    name: 'email',
    description: '이메일',
  },
  {
    type: 'password',
    name: 'pwd',
    description: '비밀번호',
  },
];

const initialState = {
  email: '',
  pwd: '',
};

export default function LoginForm() {
  const { form, onChangeHandler, onSubmitHandler } = useForm(initialState);

  const inputProps = { form, formInputData, onChangeHandler, onSubmitHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList {...inputProps} />
      <button>로그인</button>
    </form>
  );
}
