import { useState, useContext } from 'react';

import FormInputList from './FormInputList';
import UserCheckContext from '../../context/UserCheckContext';

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
  const [form, setForm] = useState(initialState);
  const userCheck = useContext(UserCheckContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!(form.email && form.pwd)) {
      return;
    }

    userCheck.userList.forEach((user) => {
      if (user.email === form.email && user.pwd === form.pwd) {
        userCheck.setUser({
          ...user,
        });
      }
    });

    setForm(initialState);
    console.log('로그인 성공');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList
        form={form}
        setForm={setForm}
        formInputData={formInputData}
      />
      <button>로그인</button>
    </form>
  );
}
