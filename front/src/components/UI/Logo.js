import styled from 'styled-components';

export default function Logo() {
  return <LogoStyle className='logo' src={'assets/images/Vring-logo.png'} />;
}

const LogoStyle = styled.img`
  align-self: center;
  margin-left: 3rem;
  width: 6rem;
`;
