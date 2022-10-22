import styled from 'styled-components';

import UserCard from './UserCard';

export default function UserInfo() {
  return (
    <UserInfoStyle>
      <UserCard />
    </UserInfoStyle>
  );
}

const UserInfoStyle = styled.div`
  height: 70vh;
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: gray 1px solid;
  border-radius: 20px;
`;
