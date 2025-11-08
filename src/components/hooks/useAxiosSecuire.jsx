// import axios from "axios";
// import { useAuth } from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: "https://smart-deals-server-part2-swart.vercel.app",
// });
// export const useAxiosSecure = () => {
//   const { user } = useAuth();
//   console.log(user);
//   axios.interceptors.request.use(config => {
//     // Do something before request is sent
//     config.headers.authorization = `Bearer ${user.accessToken}`;
//     return config;
//   });
//   return axiosSecure;
// };

import axios from "axios";
import React, { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-part2-swart.vercel.app/",
});

export const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          console.log(err);
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            signOutUser()
              .then(() => {
                console.log("Logged out due to token issue.");
                navigate("/register");
              })
              .catch(console.error);
            console.log("unauthorize message");
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
