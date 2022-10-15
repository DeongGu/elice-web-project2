import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteForm from '../User/DeleteForm';
import EditForm from '../User/EditForm';

export default function UserInfo() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionStorage.getItem('accessToken'));

    if (!sessionStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <div>
        <div>사진</div>
        <div>유저 정보</div>
      </div>
      <div>
        <EditForm />
        <DeleteForm />
      </div>
    </div>
  );
}
