import { useState, useEffect } from "react";

import * as Api from "../api/api";

export default function useFetch(request) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    if (!sessionStorage.getItem("accessToken")) {
      setIsLoading(false);
      return;
    }

    try {
      const {
        data: { data },
      } = await Api[request[0]](request[1]);
      setData(data);
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
