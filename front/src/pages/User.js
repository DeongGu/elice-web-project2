import styled from 'styled-components';

import UserInfo from '../components/User/UserInfo';

export default function User() {
  return (
    <Container>
      <UserInfo />;
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
