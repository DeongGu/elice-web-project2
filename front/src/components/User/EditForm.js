import { useContext } from 'react';

import useForm from '../../hooks/useForm';
import UserCheckContext from '../../context/UserCheckContext';
import FormInputList from './FormInputList';

const formInputData = [
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
  const { form, onChangeHandler, onSubmitHandler } = useForm(initialState);
  const inputProps = { form, formInputData, onChangeHandler, onSubmitHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList {...inputProps} />
      <button>수정</button>
    </form>
  );
}
