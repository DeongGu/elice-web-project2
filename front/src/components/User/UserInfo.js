import { useContext } from 'react';
import UserCheckContext from '../../context/UserCheckContext';

import DeleteForm from './DeleteForm';
import EditForm from './EditForm';

export default function UserInfo() {
  const userCheck = useContext(UserCheckContext);

  return (
    <div>
      <div>이메일: {userCheck.user.email}</div>
      <div>별명: {userCheck.user.nickname}</div>
      <EditForm />
      <DeleteForm />
      <button onClick={() => console.log(userCheck.userList, userCheck.user)}>
        userCheck 확인
      </button>
    </div>
  );
}
