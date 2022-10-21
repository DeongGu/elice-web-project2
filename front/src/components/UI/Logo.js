import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <LogoStyle
      className='logo'
      src={'assets/images/Vring-logo.png'}
      onClick={() => navigate('/')}
    />
  );
}

const LogoStyle = styled.img`
  align-self: center;
  margin-left: 3rem;
  width: 6rem;
`;
