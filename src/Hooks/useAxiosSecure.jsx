import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";

const instance = axios.create({
  baseURL: "https://krishi-link-server-pi.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
    //  request interceptor

    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response interceptor

    instance.interceptors.response.use((res) => {
      return res;
    }),
      (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
        }
      };
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject();
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
