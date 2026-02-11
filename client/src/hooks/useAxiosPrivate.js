import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";

// samrt axious that automatically refresh tokens without need to call the refreshendpoint manually

const useAxiosPrivate = () => {
  const { auth } = useAuth(); //extract auth state
  const refresh = useRefreshToken();

  useEffect(() => {
    //usestate attach interceptors when component mounts and remove them when unmount
    //An interceptor is like a checkpoint.
    // “Before Axios sends the request, let me look at it.
    //the req works when the user have a valid access token

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // config = the request details
        // URL
        // headers
        // method
        //if no Authorization header is present, add the access token from auth context

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        //we must return the config so that the request can proceed
        return config;
      },
      (error) => Promise.reject(error),
    );

    //Response interceptor (AFTER response comes back)

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, //when there is res means the user already has token so fine

      //but if there is error it means that the token expired so lets generate one

      async (error) => {
        const prevRequest = error.config; //we accees the original req by config obj
        //!prevRequest?.sent works as flag that we fixed the issue when it true

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; //attach new token to previous req athat failed because it expired
          return axiosPrivate(prevRequest); //call the prevreq again
        }

        return Promise.reject(error);
      },
    );

    //remove the interceptors when the component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]); //whenever the state of auth or refresh change this will be execuated

  return axiosPrivate;
};

export default useAxiosPrivate;
