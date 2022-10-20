import { useState, useEffect } from 'react';

import * as Api from '../api/api';

import { CHECK_USER } from '../api/Request';

export default function useFetch(request) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    if (request === CHECK_USER && !sessionStorage.getItem('accessToken')) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await Api[request[0]](request[1]);
      setData({ ...data });
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, setData, isLoading };
}
