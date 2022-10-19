import styled from 'styled-components';

import UserCard from './UserCard';

export default function UserInfo() {
  return (
    <UserStyle>
      <UserCard />
    </UserStyle>
  );
}

const UserStyle = styled.div`
  height: 80%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: gray 1rem solid;
  border-radius: 20px;
  outline: lightgray 1rem solid;
`;
