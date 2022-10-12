import axios from 'axios';

import { useContext, useEffect, useState } from 'react';

import UserCheckContext from '../context/UserCheckContext';

const backendPortNumber = 5000;
const serverUrl =
  'http://' + window.location.hostname + ':' + backendPortNumber + '/';

export default function useRequest(
  method,
  endPoint,
  form,
  setForm,
  initialState
) {
  const userCheck = useContext(UserCheckContext);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    try {
      setForm(initialState);
      setIsLoading(true);

      const response = await axios[method](
        serverUrl + endPoint,
        JSON.stringify(form),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (endPoint === 'users/profile') {
        userCheck.setUser(response);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmitHandler };
}
