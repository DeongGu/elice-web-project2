import { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../App';
import GeneralContext from '../../context/GeneralContext';

import useRequest from '../../hooks/useRequest';

import BreakLine from '../UI/BreakLine';
import Gender from '../UI/Gender';

import EditIconImage from '../../assets/imgs/EditIcon.png';
import LockIconImage from '../../assets/imgs/LockIcon.png';

import { EDIT_USER } from '../../api/Request';

export default function UserCard() {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const initialState = userContext.user.nickname;

  const [nickname, setNickname] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  const { requestHandler } = useRequest(EDIT_USER, { nickname });

  const submitHandler = () => {
    setEditMode(false);
    requestHandler();
  };

  const ProfileEditBtnCheck = () => {
    if (editMode) {
      return (
        <ButtonWrapper>
          <Button onClick={submitHandler}>확인</Button>
          <Button onClick={() => setEditMode(false)}>취소</Button>
        </ButtonWrapper>
      );
    }
  };

  return (
    <>
      <UserCardStyle>
        <UserCardLeft>
          <div>
            <ProfileImage
              src={userContext.user.profileImage || Gender['male']}
            />
            <EditButton
              src={EditIconImage}
              onClick={() => setEditMode((prevState) => !prevState)}
            />
          </div>
          {!editMode && <ProfileName>{nickname}</ProfileName>}
          {editMode && (
            <ProfileEditName
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          )}
          <ProfileEmail>{userContext.user.email}</ProfileEmail>
          <ProfileEditBtnCheck />
          <BreakLine />
        </UserCardLeft>
        <UserCardRight>
          <FavoriteSection>
            찜한 상품
            <FavoriteSectionBottom>
              <BreakLine />
              <Button>더보기</Button>
            </FavoriteSectionBottom>
          </FavoriteSection>
          <SecuritySection>
            <LockIcon src={LockIconImage} />
            <EditSection>보안</EditSection>
          </SecuritySection>
          <ButtonWrapper>
            <PasswordEditButton onClick={generalContext.editFormHandler}>
              비밀번호 수정
            </PasswordEditButton>
            <DeleteIdButton onClick={generalContext.deleteFormHandler}>
              회원 탈퇴하기
            </DeleteIdButton>
          </ButtonWrapper>
        </UserCardRight>
      </UserCardStyle>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 75%;
`;

const UserCardStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const UserCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 50%;
`;

const SecuritySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-contenr: center;
  align-items: center;
  margin-top: 6rem;
  height: 25%;
`;

const UserCardRight = styled(UserCardLeft)`
  justify-content: space-around;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border: gray 1rem solid;
  border-radius: 50%;
  margin-left: 32px;
`;

const ProfileName = styled.div`
  font-size: 2rem;
  font-family: elice-bold;
`;

const ProfileEditName = styled.input`
  text-align: center;
  width: 50%;
  border: lightgray 1px solid;
  border-radius: 20px;
  background-color: transparent;
  font-size: 2rem;
  font-family: elice-bold;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  font-family: elice-bold;
`;

const FavoriteSection = styled.div`
  font-size: 1.25rem;
  font-family: elice-bold;
  width: 100%;
  height: 100%;
`;

const FavoriteSectionBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

const EditSection = styled.div`
  font-size: 1.2rem;
  font-family: elice-bold;
  padding-right: 32px;
`;

const EditButton = styled.img`
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  background-color: #77bb3f;
  border-radius: 50%;
`;

const LockIcon = styled.img`
  height: 2rem;
  width: 2rem;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 2px 8px;
  font-size: 1rem;
  color: white;
  background-color: #77bb3f;
  border: #77bb3f 1px solid;
  border-radius: 20px;
  margin-top: 1rem;
`;

const PasswordEditButton = styled(Button)`
  margin-top: 2rem;
`;

const DeleteIdButton = styled(PasswordEditButton)`
  margin-left: 2rem;
`;
