import * as Api from '../../api/api';

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../App';
import GeneralContext from '../../context/GeneralContext';

import useRequest from '../../hooks/useRequest';

import { Validate } from './Validate';

import BreakLine from '../UI/BreakLine';
import Gender from '../UI/Gender';

import { CHECK_DIBS, EDIT_USER } from '../../api/endpoints';
import useFetch from '../../hooks/useFetch';

import EditIcon from '../../assets/images/user-info-icons/EditIcon.png';
import LockIconImage from '../../assets/images/user-info-icons/LockIcon.png';

export default function UserCard() {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const navigate = useNavigate();

  const initialState = {
    nickname: userContext.user?.nickname || null,
    userDesc: userContext.user?.userDesc || null,
  };

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [tempEditValue, setTempEditValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  const { requestHandler: formHandler } = useRequest(EDIT_USER, form);
  const { data: dibData, isLoading } = useFetch(CHECK_DIBS);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!Validate['nickname'].test(form.nickname)) {
      setError('4 ~ 16자, 영문, 한글 혹은 숫자여야 합니다.');
      return;
    }

    if (form.userDesc) {
      if (form.userDesc.length > 200) {
        setError('한 줄 소개는 200자 이하여야 합니다.');
        return;
      }
    }

    const image = e.target.fileInput.files[0];

    const formData = new FormData();
    formData.append('file', image);

    Api.put('users', formData);

    setEditMode(false);
    setTempEditValue(form);
    setError('');

    await formHandler();
  };

  const toggleHandler = () => {
    setError('');
    setEditMode((prevState) => !prevState);
    setForm(tempEditValue);
  };

  const onChangeHandler = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const Dibs = () => {
    return dibData.map((dib, index) => (
      <div key={'dibs' + index}>
        <ProductImage
          src={dib['item.itemImage'] || '/assets/images/default.png'}
          onClick={() => navigate(`/items/${dib.itemId}`)}
        />
      </div>
    ));
  };

  useEffect(() => {
    if (!userContext.user) {
      navigate('/');
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
                    src={userContext.user.profileImage || Gender['male']}
                  />
                  <EditButton
                    type='button'
                    src={EditIcon}
                    onClick={toggleHandler}
                  />
                </>
              )}
              {editMode && (
                <>
                  <ProfileImageLabel htmlFor='fileInput'>
                    <ProfileLabelText>이미지 변경</ProfileLabelText>
                  </ProfileImageLabel>
                  <ProfileImageInput
                    id='fileInput'
                    type='file'
                    name='fileInput'
                  />
                </>
              )}
            </div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {!editMode && <ProfileName>{form.nickname}</ProfileName>}
            {editMode && (
              <ProfileEditName
                name='nickname'
                value={form.nickname}
                onChange={onChangeHandler}
              />
            )}
            <ProfileEmail>{userContext.user.email}</ProfileEmail>
            {editMode && (
              <ProfileEditDescription
                maxLength='50'
                name='userDesc'
                value={form.userDesc}
                onChange={onChangeHandler}
              />
            )}
            {!editMode && <UserDescription>{form.userDesc}</UserDescription>}
            {editMode && (
              <ButtonWrapper>
                <Button>확인</Button>
                <Button type='button' onClick={toggleHandler}>
                  취소
                </Button>
              </ButtonWrapper>
            )}
            <BreakLine />
          </UserCardLeft>
          <UserCardRight>
            <FavoriteSection>
              찜한 상품
              <FavoriteSectionTop>{!isLoading && <Dibs />}</FavoriteSectionTop>
            </FavoriteSection>
            <SecuritySection>
              <LockIcon src={LockIconImage} />
              <EditSection>보안</EditSection>
            </SecuritySection>
            <ButtonWrapper>
              <PasswordEditButton
                type='button'
                onClick={generalContext.editFormHandler}
              >
                비밀번호 수정
              </PasswordEditButton>
              <DeleteIdButton
                type='button'
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
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  height: 25%;
`;

const UserCardRight = styled(UserCardLeft)`
  justify-content: space-around;
  width: 50%;
  margin-right: 3rem;
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
  background-color: transparent;
  margin-bottom: 6px;
  text-align: center;
`;

const ProfileLabelText = styled.span`
  display: inline-block;
  margin-top: 3rem;
  font-size: 1rem;
  padding: 4px 12px;
  color: black;
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

const ProfileEditDescription = styled.textarea`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  text-align: left;
  width: 360px;
  height: 100px;
  border: lightgray 1px solid;
  border-radius: 20px;
  background-color: transparent;
  font-size: 1rem;
  resize: none;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  font-family: elice-bold;
`;

const FavoriteSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-family: elice-bold;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const FavoriteSectionTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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

const UserDescription = styled.div`
  margin-top: 1rem;
`;

const EditButton = styled.img`
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  background-color: gray;
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
  background-color: gray;
  border: gray 1px solid;
  border-radius: 20px;
  margin-top: 1rem;
`;

const PasswordEditButton = styled(Button)`
  margin-top: 2rem;
`;

const DeleteIdButton = styled(PasswordEditButton)`
  margin-left: 2rem;
`;

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const ProductName = styled.div`
  font-size: 0.9rem;
`;
