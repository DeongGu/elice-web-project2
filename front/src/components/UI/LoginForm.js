import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import UserCheckContext from '../../context/UserCheckContext';
import ModalBackground from './ModalBackground';

import '../../assets/style/LoginForm.css';

const USER = '/users';

const LoginForm = ({ setShowLoginForm }) => {
  const userCheck = useContext(UserCheckContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
    isEmpty: false,
  });

  const onChangeHandler = (event) => {
    const { id, value } = event.target;

    setForm((prevState) => ({ ...prevState, [id]: value }));
    console.log(form);
  };

  const resetForm = () => {
    setForm({});
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!(form.email && form.password)) {
      return;
    }
    console.log('test');

    try {
      const userInfo = await axios.post(USER, {
        email: form.email,
        password: form.password,
      });

      // const user = userInfo.data;
      // const jwtToken = user.token;

      // sessionStorage.setItem('userToken', jwtToken);
      // userCheck.setUser({email: form.email, password: form.password, userToken: jwtToken})
      // resetForm();
    } catch (err) {
      console.log(err.message);
      setForm((prevState) => ({ ...prevState, isEmpty: true }));
    }
  };

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, isEmpty: false }));
  }, [form.email, form.password]);

  return (
    <React.Fragment>
      <ModalBackground toggleHandler={setShowLoginForm} />
      <div className='login-form'>
        <h1>로그인</h1>
        {form.isEmpty && <h2>로그인에 실패했습니다. 다시 확인해주세요.</h2>}
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            onChange={onChangeHandler}
            value={form.email ?? ''}
          />
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            onChange={onChangeHandler}
            value={form.password ?? ''}
          />
          <button>로그인</button>
        </form>
        <div className='line' />
        <p>
          가입하지 않으셨나요?
          <span className='register-button'>회원가입</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
