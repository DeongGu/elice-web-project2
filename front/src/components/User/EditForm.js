import { useContext } from 'react';

import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';

import InputList from './InputList';

import UserCheckContext from '../../context/UserCheckContext';

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
];

export default function EditForm() {
  const userCheck = useContext(UserCheckContext);
  const initialState = { ...userCheck.user };

  const { form, onChangeHandler } = useForm(initialState);
  const { requestHandler, isLoading } = useRequest('get', 'users', form);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
  };

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>수정</button>
    </form>
  );
}
