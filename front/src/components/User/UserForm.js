import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import * as Api from '../../api/api';
import { CHECK_DIBS, EDIT_USER } from '../../api/endpoints';

import useFetch from '../../hooks/useFetch';
import useRequest from '../../hooks/useRequest';

import { UserContext } from '../../App';
import GeneralContext from '../../context/GeneralContext';

import BreakLine from '../UI/BreakLine';
import ModalBackground from '../UI/ModalBackground';
import UserViewForm from './UserViewForm';
import UserEditForm from './UserEditForm';

export default function UserForm({ isEditable }) {
  const generalContext = useContext(GeneralContext);
  const userContext = useContext(UserContext);

  const initialState = {
    email: userContext.user.email,
    nickname: userContext.user.nickname,
    userDesc: userContext.user.userDesc || '',
  };

  const [form, setForm] = useState(initialState);
  const [tempForm, setTempForm] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();
  const imageRef = useRef();

  const navigate = useNavigate();

  const { requestHandler: submitFormHandler } = useRequest(EDIT_USER, '', form);
  const { data: dibData, isLoading } = useFetch(CHECK_DIBS);

  const onChangeHandler = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const imageHandler = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const inputOnChange = (event) => {
    event.preventDefault();

    if (!event.target.files[0]) {
      return;
    }

    const image = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      imageRef.current.src = event.target.result;
    };

    fileReader.readAsDataURL(image);
  };

  const editModeToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const onCancelHandler = () => {
    setForm(tempForm);
    setIsEditing(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setTempForm(form);
    setIsEditing(false);

    console.log(inputRef.current.files[0]);

    try {
      await submitFormHandler();

      if (inputRef.current.files[0]) {
        const image = inputRef.current.files[0];
        const formData = new FormData();

        formData.append('file', image);
        await Api.put('users', formData);
      }
    } catch (err) {
      console.log(err.response.message);
    }
  };

  const showDibs = () => {
    return dibData.map((dib, index) => (
      <div key={'dib' + index}>
        <img
          src={dib['item.itemImage'] || `assets/images/default.png`}
          onClick={() => navigate(`/items/${dib.itemId}`)}
        />
      </div>
    ));
  };

  const viewFormProps = {
    form,
    profileImage: userContext.user.profileImage,
    email: userContext.user.email,
    userDesc: userContext.user.userDesc || '',
    imageRef,
  };

  const editFormProps = {
    form,
    profileImage: userContext.user.profileImage,
    email: userContext.user.email,
    userDesc: userContext.user.userDesc || '',
    inputRef,
    imageRef,
    imageHandler,
    inputOnChange,
    onChangeHandler,
  };

  useEffect(() => {
    if (!userContext.user) {
      generalContext.disableFormHandler();
    }
  }, [userContext.user]);

  return (
    <>
      <ModalBackground />
      {!userContext.isLoading && (
        <UserFormStyle onSubmit={onSubmitHandler}>
          {!isEditing ? (
            <>
              <UserViewForm {...viewFormProps} />
              <button type='button' onClick={editModeToggle}>
                수정
              </button>
            </>
          ) : (
            <>
              <UserEditForm {...editFormProps} />
              <ButtonWrapper>
                <button>확인</button>
                <button type='button' onClick={onCancelHandler}>
                  취소
                </button>
              </ButtonWrapper>
            </>
          )}
          <BreakLine />
          <Security />
        </UserFormStyle>
      )}
    </>
  );
}

const UserFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 40rem;
  background-color: white;
  border: lightgray 1px solid;
  border-radius: 20px;

  img {
    width: 8rem;
    height: 8rem;
    border: gray 0.25rem solid;
    border-radius: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  button {
    cursor: pointer;
    padding: 2px 8px;
    font-size: 1rem;
    color: white;
    background-color: gray;
    border: gray 1px solid;
    border-radius: 20px;
    margin-top: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 75%;
`;

const Security = styled.div``;
