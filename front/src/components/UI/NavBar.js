import './NavBar.css';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li>소개</li>
        <li>마켓</li>
        <li>로그인</li>
        <li className='start-button'>시작하기</li>
      </ul>
    </nav>
  );
}
