import * as Api from "../api";

import { useContext, useState } from "react";

import UserCheckContext from "../context/UserCheckContext";
import axios from "axios";

export default function useRequest(method, endpoint, params = "", form = {}) {
  const userCheck = useContext(UserCheckContext);

  const [isLoading, setIsLoading] = useState(false);

  const requestHandler = async () => {
    try {
      setIsLoading(true);

      if (method === "get") {
        await Api.get(endpoint, params);
        return;
      }

      if (method === "delete") {
        await Api.delete(endpoint, params);
        return;
      }

      if (method === "put") {
        await Api.put(endpoint, form);
        return;
      }

      const response = await Api[method](endpoint, form);
      const fetchedData = await response.data;

      if (fetchedData["Authentication"]) {
        const accessToken = fetchedData["Authentication"];

        sessionStorage.setItem("accessToken", accessToken);

        const response = await Api.get("users");
        const userData = response.data;

        userCheck.setUser(userData);

        console.log("sessionStorage에 AccessToken 저장");
      }

      console.log(method, endpoint + " 성공");
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { requestHandler, isLoading, userCheck };
}
