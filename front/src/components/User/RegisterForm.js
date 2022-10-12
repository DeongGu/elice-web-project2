import useForm from '../../hooks/useForm';
import FormInputList from './FormInputList';

const formInputData = [
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
    name: 'pwd',
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
  pwd: '',
  confirmPwd: '',
};

export default function RegisterForm() {
  const { form, onChangeHandler, onSubmitHandler } = useForm(initialState);

  const inputProps = { form, formInputData, onChangeHandler, onSubmitHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList {...inputProps} />
      <button>회원가입</button>
    </form>
  );
}
