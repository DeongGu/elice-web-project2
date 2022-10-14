import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
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
  const { form, setForm, formIsValid, setFormIsValid } = useForm(initialState);
  const { validateHandler } = useValidation(setForm, setFormIsValid);
  const { requestHandler } = useRequest('post', 'users', '', form);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
    setForm(initialState);
    setFormIsValid(initialState);
  };

  const inputProps = {
    inputData,
    form,
    formIsValid,
    validateHandler,
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <ValidateInputList {...inputProps} />
      <button>회원가입</button>
    </form>
  );
}
