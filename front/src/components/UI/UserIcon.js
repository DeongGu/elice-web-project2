import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Gender from './Gender';

export default function UserIcon({ profileImage }) {
  const navigate = useNavigate();

  return (
    <UserIconStyle
      onClick={() => navigate('/users/my-profile')}
      src={profileImage || Gender['male']}
    />
  );
}

const UserIconStyle = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: gray 0.5rem solid;
  border-radius: 50%;
  margin-right: 3rem;
`;
