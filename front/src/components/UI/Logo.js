import styled from 'styled-components';

import logo from '../../assets/imgs/Vring-logo.png';

export default function Logo() {
  return <LogoStyle className='logo' src={logo} />;
}

const LogoStyle = styled.img`
  align-self: center;
  margin-left: 3rem;
  width: 6rem;
`;
