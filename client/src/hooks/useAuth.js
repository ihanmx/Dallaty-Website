import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

// this is a custom hook to use the auth context, so we can use it in any component without importing useContext and AuthContext

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
