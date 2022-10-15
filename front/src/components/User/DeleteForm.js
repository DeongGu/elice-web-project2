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
    name: 'pwd',
    description: '비밀번호',
  },
];

const initialState = {
  email: '',
  pwd: '',
};

export default function DeleteForm() {
  const { form, onChangeHandler } = useForm(initialState);
  const { requestHandler, isLoading } = useRequest('delete', 'users');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await requestHandler();
  };

  const inputProps = { form, inputData, onChangeHandler };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputList {...inputProps} />
      <button>삭제</button>
    </form>
  );
}
