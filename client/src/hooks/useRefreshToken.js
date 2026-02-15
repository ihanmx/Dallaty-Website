import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  //to set the auth state
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/admin/refresh", { withCredentials: true }); //calls the backend refresh end point toget new access token
    setAuth((prev) => {
      console.log("Previous Auth State:", JSON.stringify(prev)); //this prent the state before refresh and set
      console.log("New access token:", response.data.accessToken);

      return { ...prev, accessToken: response.data.accessToken }; //set auth state to new accessToken
    });

    return response.data.accessToken; //to return access token to the caller of refresh function
  }; //so no need to dig in auth state

  return refresh;
};

export default useRefreshToken;
