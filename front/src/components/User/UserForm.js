import * as Api from '../../api/api';

import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalBackground from '../UI/ModalBackground';

import { UserContext } from '../../App';
import GeneralContext from '../../context/GeneralContext';

import useRequest from '../../hooks/useRequest';

import { Validate } from './Validate';

import BreakLine from '../UI/BreakLine';
import Gender from '../UI/Gender';

import { CHECK_DIBS, EDIT_USER } from '../../api/Request';
import useFetch from '../../hooks/useFetch';

export default function UserForm() {
  const generalContext = useContext(GeneralContext);
  const userContext = useContext(UserContext);

  const imageRef = useRef();

  const imageHandler = (event) => {
    event.preventDefault();
    imageRef.current.click();
  };

  const navigate = useNavigate();

  const initialState = {
    nickname: userContext.user.nickname,
    userDesc: userContext.user.userDesc || null,
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

  const DibsHandler = () => {
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
      generalContext.disableFormHandler();
    }
  }, [userContext.user]);

  return (
    <>
      <ModalBackground />
      {!userContext.isLoading && (
        <UserFormStyle>
          <form onSubmit={submitHandler}>
            <img
              src={userContext.user.profileImage || Gender['male']}
              onClick={imageHandler}
            />
            <input type='file' ref={imageRef} accept='image/* ' />
            <ProfileName>{form.nickname}</ProfileName>
            <ProfileEmail>{userContext.user.email}</ProfileEmail>
            <UserDescription>{form.userDesc}</UserDescription>
            <BreakLine />
            <Dibs />
            <Security />
          </form>
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
    cursor: pointer;
  }

  input {
    display: none;
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
    margin-top: 1rem;
  }
`;

const ProfileName = styled.div`
  font-size: 2rem;
  font-family: elice-bold;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  font-family: elice-bold;
`;

const UserDescription = styled.div`
  margin-top: 1rem;
`;

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const Security = styled.div``;
const Dibs = styled.div``;
