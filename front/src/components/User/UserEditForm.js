import styled from 'styled-components';

import Gender from '../UI/Gender';

export default function UserViewForm({
  form,
  profileImage,
  email,
  imageHandler,
  imageRef,
  inputRef,
  inputOnChange,
  onChangeHandler,
}) {
  return (
    <>
      <Img
        src={profileImage || Gender['male']}
        onClick={imageHandler}
        ref={imageRef}
      />
      <Input
        type='file'
        ref={inputRef}
        onChange={inputOnChange}
        accept='image/* '
        name='image'
      />
      <ProfileName
        name='nickname'
        value={form.nickname}
        onChange={onChangeHandler}
      />
      <ProfileEmail>{email}</ProfileEmail>
      <UserDescription
        value={form.userDesc}
        onChange={onChangeHandler}
        name='userDesc'
      />
    </>
  );
}

const ProfileName = styled.input`
  text-align: center;
  width: 50%;
  border: lightgray 1px solid;
  border-radius: 20px;
  background-color: transparent;
  font-size: 2rem;
  font-family: elice-bold;
  margin-top: 0.5rem;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  font-family: elice-bold;
`;

const UserDescription = styled.textarea`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  text-align: left;
  width: 360px;
  height: 100px;
  border: lightgray 1px solid;
  border-radius: 20px;
  background-color: transparent;
  font-size: 1rem;
  resize: none;
`;

const Img = styled.img`
  width: 8rem;
  height: 8rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;
