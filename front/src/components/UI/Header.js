import NavBar from './NavBar';
import Logo from './Logo';

import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <Logo />
      <NavBar />
    </header>
  );
}
