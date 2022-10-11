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
  const [form, setForm] = useState(initialState);
  const userCheck = useContext(UserCheckContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (userCheck.user) {
      return;
    }

    userCheck.setUserList((prevState) => [
      ...prevState,
      {
        email: form.email,
        nickname: form.nickname,
        pwd: form.pwd,
      },
    ]);

    setForm(initialState);
    console.log('회원가입 성공');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList
        form={form}
        setForm={setForm}
        formInputData={formInputData}
      />
      <button>회원가입</button>
    </form>
  );
}
