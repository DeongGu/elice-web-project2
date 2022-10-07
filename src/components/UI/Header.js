import React, { useState } from 'react';

import RegisterForm from './RegisterForm';

import '../../assets/style/Header.css';

const Header = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <React.Fragment>
      <header className='header'>
        {showRegisterForm && (
          <RegisterForm setShowRegisterForm={setShowRegisterForm} />
        )}
        <div className='header-tab-list'>
          <div className='header-logo'>로고</div>
          <div className='header-tab'>소개</div>
          <div className='header-tab'>마켓 </div>
          <div className='header-tab'>로그인</div>
          <div className='header-tab' onClick={() => setShowRegisterForm(true)}>
            시작하기
          </div>
        </div>
        <div className='header-tab-list-vertical'>
          <button className='header-tab-vertical selected'>환경 문제</button>
          <button className='header-tab-vertical'>사이트 소개</button>
          <button className='header-tab-vertical'>팀원 목록</button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
