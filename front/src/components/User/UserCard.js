import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../App";
import GeneralContext from "../../context/GeneralContext";

import useRequest from "../../hooks/useRequest";

import { Validate } from "./Validate";

import BreakLine from "../UI/BreakLine";
import Gender from "../UI/Gender";

import EditIconImage from "../../assets/imgs/EditIcon.png";
import LockIconImage from "../../assets/imgs/LockIcon.png";

import { EDIT_USER } from "../../api/Request";

export default function UserCard() {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const navigate = useNavigate();

  const initialState = userContext.user?.nickname;

  const [nickname, setNickname] = useState(initialState);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [tempEditValue, setTempEditValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  const { requestHandler: formDataHandler } = useRequest(EDIT_USER, formData);
  const { requestHandler: nicknameHandler } = useRequest(EDIT_USER, {
    nickname,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!Validate["nickname"].test(nickname)) {
      setError("4 ~ 16자, 영문, 한글 혹은 숫자여야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", e.target.fileInput.files[0]);
    formData.append("nickname", nickname);

    setFormData(formData);
    setEditMode(false);
    setTempEditValue(nickname);
    setError("");

    await formDataHandler();
    await nicknameHandler();
  };

  const toggleHandler = () => {
    setError("");
    setEditMode((prevState) => !prevState);
    setNickname(tempEditValue);
  };

  useEffect(() => {
    if (!userContext.user) {
      navigate("/");
    }
  }, [userContext.user]);

  return (
    userContext.user && (
      <>
        <UserCardStyle onSubmit={submitHandler}>
          <UserCardLeft>
            <div>
              {!editMode && (
                <>
                  <ProfileImage
                    src={userContext.user.profileImage || Gender["male"]}
                  />
                  <EditButton
                    type="button"
                    src={EditIconImage}
                    onClick={toggleHandler}
                  />
                </>
              )}
              {editMode && (
                <>
                  <ProfileImageLabel htmlFor="fileInput">
                    <ProfileLabelText>이미지 변경</ProfileLabelText>
                  </ProfileImageLabel>
                  <ProfileImageInput
                    id="fileInput"
                    type="file"
                    name="fileInput"
                  />
                </>
              )}
            </div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {!editMode && <ProfileName>{nickname}</ProfileName>}
            {editMode && (
              <ProfileEditName
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />
            )}
            <ProfileEmail>{userContext.user.email}</ProfileEmail>
            {editMode && (
              <ButtonWrapper>
                <Button>확인</Button>
                <Button type="button" onClick={toggleHandler}>
                  취소
                </Button>
              </ButtonWrapper>
            )}
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
              <PasswordEditButton
                type="button"
                onClick={generalContext.editFormHandler}
              >
                비밀번호 수정
              </PasswordEditButton>
              <DeleteIdButton
                type="button"
                onClick={generalContext.deleteFormHandler}
              >
                회원 탈퇴하기
              </DeleteIdButton>
            </ButtonWrapper>
          </UserCardRight>
        </UserCardStyle>
      </>
    )
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 75%;
`;

const ErrorMsg = styled.div`
  font-size: 1rem;
  color: red;
`;

const UserCardStyle = styled.form`
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
  width: 8rem;
  height: 8rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
  margin-left: 32px;
`;

const ProfileImageLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 8rem;
  height: 8rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
  background-color: #77bb3f;
  margin-bottom: 6px;
`;

const ProfileLabelText = styled.span`
  display: inline-block;
  margin-top: 3rem;
  font-size: 1rem;
  padding: 4px 12px;
  color: white;
`;

const ProfileImageInput = styled.input`
  display: none;
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
