import React, { useRef, useEffect, useReducer } from 'react';
import axios from 'axios';

import ModalBackground from './ModalBackground';

import '../../assets/style/RegisterForm.css';

const REGISTER = '/register';

const validateForm = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  nickname: /^[^0-9]\w+$/,
  password: /(?=.*\d)(?=.*[a-z]).{8,}/,
  confirmPwd: /(?=.*\d)(?=.*[a-z]).{8,}/,
};

// 정규 표현식을 어떻게 할지 아직 못 정해서 임의로 넣음

const initialState = {
  email: '',
  emailIsValid: false,
  emailFocused: false,

  nickname: '',
  nicknameIsValid: false,
  nicknameFocused: false,

  password: '',
  passwordIsValid: false,
  passwordFocused: false,

  confirmPwd: '',
  confirmPwdIsValid: false,
  confirmPwdFocused: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.name]: action.value };
    case 'VALIDATE':
      return {
        ...state,
        [`${action.name}IsValid`]: validateForm[action.name].test(action.value),
      };
    case 'FOCUS':
      return { ...state, [`${action.name}Focused`]: action.value };
    case 'FIRST_INPUT':
      return {
        ...state,
        [`${action.name}IsValid`]: true,
      };
    default:
      return state;
  }
};

const RegisterForm = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);

  const emailRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();

  // const errorRef = useRef(); -> 에러 메시지 화면 출력을 만들까 말까 생각 중

  const inputCheck = {
    email: !formState.emailIsValid && formState.email ? 'invalid' : '',
    nickname: !formState.nicknameIsValid && formState.nickname ? 'invalid' : '',
    password: !formState.passwordIsValid && formState.password ? 'invalid' : '',
    confirmPwd:
      !formState.confirmPwdIsValid && formState.confirmPwd ? 'invalid' : '',
  };

  const onChangeHandler = (event) => {
    dispatchForm({
      type: 'INPUT',
      name: event.target.id,
      value: event.target.value,
    });
  };

  const onFocusHandler = (event) => {
    dispatchForm({
      type: 'FOCUS',
      name: event.target.name,
      value: true,
    });

    dispatchForm({
      type: 'FIRST_INPUT',
      name: event.target.name,
      value: formState.name,
    });
  };

  // Focus 있는 이유는 처음 눌렀을 때 도움말 비스무리하게 뜨게 하기 위해서

  const onBlurHandler = (event) => {
    dispatchForm({
      type: 'FOCUS',
      name: event.target.name,
      value: false,
    });
  };

  const resetForm = (reset = '') => {
    dispatchForm({
      type: 'INPUT',
      email: reset,
      nickname: reset,
      password: reset,
      confirmPwd: reset,
    });
  };

  const validateForm = () => {
    const {
      emailIsValid,
      nicknameIsValid,
      passwordIsValid,
      confirmPwdIsValid,
    } = formState;

    if (
      !(emailIsValid && nicknameIsValid && passwordIsValid && confirmPwdIsValid)
    ) {
      return false;
    }

    return {
      email: formState.email,
      nickname: formState.nickname,
      password: formState.password,
    };
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const validatedData = validateForm();

    if (!validatedData) {
      return;
    }

    try {
      await axios.post(REGISTER, JSON.stringify(validatedData), {
        headers: { 'Content-Type': 'application/json' },
      }); // 정해진 거 없어서 흉내만 냄
      resetForm();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchForm({
        type: 'VALIDATE',
        name: 'email',
        value: formState.email,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [formState.email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchForm({
        type: 'VALIDATE',
        name: 'nickname',
        value: formState.nickname,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [formState.nickname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchForm({
        type: 'VALIDATE',
        name: 'password',
        value: formState.password,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [formState.password]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchForm({
        type: 'VALIDATE',
        name: 'confirmPwd',
        value: formState.confirmPwd,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [formState.confirmPwd]);

  return (
    <React.Fragment>
      <ModalBackground toggleHandler={props.setShowRegisterForm} />
      <div className='register-form'>
        <h1>회원가입</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>이메일</label>
          <input
            ref={emailRef}
            className={inputCheck.email}
            type='email'
            id='email'
            name='email'
            value={formState.email}
            autoComplete='off'
            required
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          {formState.emailFocused &&
            (formState.emailIsValid || !formState.email) && (
              <p>이메일은 ~로 작성해야 합니다.</p>
            )}
          {!formState.emailIsValid && formState.email && (
            <p className='invalid'>
              이메일은 ~~해야 합니다. 다시 작성해주세요.
            </p>
          )}
          <label htmlFor='nickname'>별명</label>
          <input
            ref={nicknameRef}
            className={inputCheck.nickname}
            type='text'
            id='nickname'
            name='nickname'
            value={formState.nickname}
            autoComplete='off'
            required
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          {formState.nicknameFocused &&
            (formState.nicknameIsValid || !formState.nickname) && (
              <p>닉네임은 ~로 작성해야 합니다.</p>
            )}
          {!formState.nicknameIsValid && formState.nickname && (
            <p className='invalid'>
              닉네임은 ~~해야 합니다. 다시 작성해주세요.
            </p>
          )}
          <label htmlFor='password'>비밀번호</label>
          <input
            ref={passwordRef}
            className={inputCheck.password}
            type='password'
            id='password'
            name='password'
            value={formState.password}
            autoComplete='off'
            required
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          {formState.passwordFocused &&
            (formState.passwordIsValid || !formState.password) && (
              <p>비밀번호는 ~로 작성해야 합니다.</p>
            )}
          {!formState.passwordIsValid && formState.password && (
            <p className='invalid'>
              비밀번호는 ~~해야 합니다. 다시 작성해주세요.
            </p>
          )}
          <label htmlFor='confirmPwd'>비밀번호 확인</label>
          <input
            ref={confirmPwdRef}
            className={inputCheck.confirmPwd}
            type='password'
            id='confirmPwd'
            name='confirmPwd'
            value={formState.confirmPwd}
            autoComplete='off'
            required
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          {formState.confirmPwdFocused &&
            (formState.confirmPwdIsValid || !formState.confirmPwd) && (
              <p>상단의 비밀번호와 똑같아야 합니다.</p>
            )}
          {!formState.confirmPwdIsValid && formState.confirmPwd && (
            <p className='invalid'>
              상단의 비밀번호와 똑같아야 합니다. 다시 작성해주세요.
            </p>
          )}
          <button>회원가입</button>
        </form>
        <div className='line'></div>
        <p>
          이미 가입하셨나요?
          <span className='login-button'>로그인</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
