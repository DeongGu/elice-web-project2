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
    name: 'pwd',
    description: '비밀번호',
  },
];

const initialState = {
  email: '',
  pwd: '',
};

export default function DeleteForm() {
  const { form, onChangeHandler, onSubmitHandler } = useForm(
    initialState,
    'delete',
    'users/leave'
  );

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>삭제</button>
    </form>
  );
}
