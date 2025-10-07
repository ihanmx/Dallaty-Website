import { createContext, useContext, useState } from "react";

// Create the context
const LostUserInfoContext = createContext({});

// Create a provider component
const LostUserInfoProvider = ({ children }) => {
  const [lostUserInfo, setLostUserInfo] = useState({
    name: "",
    email: "",
    description: "",
    location: "",
    file: null,
    resource: "",
    terms: false,
    fees: false,
  });

  //export the context to use it on the app level
  return (
    <LostUserInfoContext.Provider value={{ lostUserInfo, setLostUserInfo }}>
      {children}
    </LostUserInfoContext.Provider>
  );
};
// Custom hook to use the LostUserInfoContext
const useLostUserInfo = () => {
  return useContext(LostUserInfoContext);
};

export { LostUserInfoProvider, useLostUserInfo };
