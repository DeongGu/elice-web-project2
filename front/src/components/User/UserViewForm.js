import styled from 'styled-components';

import Gender from '../UI/Gender';

export default function UserViewForm({ form, profileImage, email, imageRef }) {
  return (
    <>
      <Img ref={imageRef} src={profileImage || Gender['male']} />
      <Input type='file' accept='image/* ' name='image' />
      <ProfileName>{form.nickname}</ProfileName>
      <ProfileEmail>{email}</ProfileEmail>
      <UserDescription>
        {form.userDesc || '소개를 추가해보세요! 프로필도 바꿀 수 있습니다!'}
      </UserDescription>
    </>
  );
}

const ProfileName = styled.div`
  font-size: 2rem;
  font-family: elice-bold;
  margin-top: 0.5rem;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  font-family: elice-bold;
`;

const UserDescription = styled.div`
  margin-top: 1rem;
`;

const Img = styled.img`
  width: 8rem;
  height: 8rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
`;
const Input = styled.input`
  display: none;
`;
