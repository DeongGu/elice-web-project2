import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { UserContext } from '../../App';

import Gender from './Gender';

export default function UserIcon() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const [userInfo, setUserInfo] = useState(false);

  return (
    <>
      <UserIconStyle
        onClick={() => setUserInfo((prevState) => !prevState)}
        src={userContext.user.profileImage || Gender['male']}
      />
      {userInfo && (
        <>
          <UserInfoVertex />
          <UserInfo>
            <UserTop>
              <UserInfoIcon
                src={userContext.user.profileImage || Gender['male']}
              />
              <UserDescription>
                <UserName>{userContext.user.nickname}</UserName>
                <UserEmail>{userContext.user.email}</UserEmail>
                <GoToUserInfo onClick={() => navigate('/users/profile')}>
                  계정 정보
                </GoToUserInfo>
              </UserDescription>
            </UserTop>
            <BreakLine />
            <UserBottom>
              <LogoutButton onClick={userContext.logoutHandler}>
                로그아웃
              </LogoutButton>
            </UserBottom>
          </UserInfo>
        </>
      )}
    </>
  );
}

const UserIconStyle = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
  margin-right: 3rem;
`;

const UserInfoIcon = styled.img`
  width: 4rem;
  height: 4rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
  margin-left: 2rem;
`;

const UserInfoVertex = styled.div`
  width: 1rem;
  height: 1rem;
  z-index: 6;
  position: absolute;
  top: 80px;
  right: 63px;
  transform: rotate(45deg);
  background-color: white;
  border: lightgray 3px solid;
  border-bottom: none;
  border-right: none;
`;

const UserInfo = styled.div`
  width: 18rem;
  height: 10rem;
  border: lightgray 3px solid;
  border-radius: 20px;
  z-index: 5;
  position: absolute;
  top: 89px;
  right: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserDescription = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 1rem;
`;

const UserName = styled.div`
  font-size: 1.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
`;

const GoToUserInfo = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 0.95rem;
  margin-top: 6px;
  text-decoration: underline;
`;

const UserBottom = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1rem;
`;

const BreakLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: lightgray;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  margin-left: 2rem;
`;
