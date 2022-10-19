import { useContext, useState } from 'react';

import * as Api from '../api/api';
import { CHECK_USER } from '../api/Request';

import { UserContext } from '../App';
import GeneralContext from '../context/GeneralContext';

export default function useRequest(request, params = '', form = {}) {
  const userContext = useContext(UserContext);
  const generalContext = useContext(GeneralContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestHandler = async () => {
    try {
      setIsLoading(true);

      const {
        data,
        data: { Authentication: accessToken },
      } = await Api[request[0]](
        request[1],
        params || form,
        params && form && form
      );

      if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);

        const { data: userData } = await Api[CHECK_USER[0]](CHECK_USER[1]);
        userContext.setUser({ ...userData });
      }

      console.log(request[0], request[1]);
      generalContext.disableFormHandler();
      return data;
    } catch (err) {
      console.log(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { requestHandler, isLoading, error, userContext };
}
