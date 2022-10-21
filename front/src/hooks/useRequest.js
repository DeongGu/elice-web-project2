import { useContext, useState } from 'react';

import * as Api from '../api/api';
import { CHECK_USER } from '../api/endpoints';

import { UserContext } from '../App';
import GeneralContext from '../context/GeneralContext';

export default function useRequest(request, params = '', form = {}) {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestHandler = async () => {
    try {
      const {
        data: { data },
      } = await Api[request[0]](
        request[1],
        params || form,
        params && form && form
      );

      const accessToken = data.Authentication;

      if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);

        const {
          data: { data: userData },
        } = await Api[CHECK_USER[0]](CHECK_USER[1]);
        userContext.setUser(userData);
      }

      generalContext.disableFormHandler();
      return data;
    } catch (err) {
      setError('해당 요청을 실패했습니다. 다시 한번 확인해주세요.');
      console.log(err.response.data.message);
      if (err.response.data.message === 'Email already exists') {
        setError('중복된 이메일이 있습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { requestHandler, isLoading, error, userContext };
}
