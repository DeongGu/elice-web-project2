import { useState, useContext } from 'react';

import FormInputList from './FormInputList';
import UserCheckContext from '../../context/UserCheckContext';

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
  const [form, setForm] = useState({
    nickname: userCheck.user.nickname,
    pwd: userCheck.user.pwd,
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!(form.email && form.pwd && form.nickname && form.confirmPwd)) {
      return;
    }

    userCheck.userList.forEach((user) => {
      if (user.email === form.email && user.pwd === form.pwd) {
        userCheck.setUser({
          ...user,
        });
      }
    });

    console.log('수정 성공');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormInputList
        form={form}
        setForm={setForm}
        formInputData={formInputData}
      />
      <button>편집</button>
    </form>
  );
}
