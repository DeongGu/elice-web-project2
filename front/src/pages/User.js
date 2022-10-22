import { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../App';

import UserInfo from '../components/User/UserInfo';

export default function User() {
  const userContext = useContext(UserContext);

  return (
    !userContext.isLoading && (
      <Container>
        <UserInfo />
      </Container>
    )
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
