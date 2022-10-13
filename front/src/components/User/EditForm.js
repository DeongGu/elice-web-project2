import { useContext } from 'react';

import useForm from '../../hooks/useForm';

import InputList from './InputList';

import UserCheckContext from '../../context/UserCheckContext';

const inputData = [
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
];

export default function EditForm() {
  const userCheck = useContext(UserCheckContext);

  const initialState = { ...userCheck.user };

  const { form, onChangeHandler, onSubmitHandler } = useForm(
    initialState,
    'put',
    'users/profile'
  );
  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>수정</button>
    </form>
  );
}
