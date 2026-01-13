import { createContext, useContext, useState } from "react";

// Create the context
const FoundUserInfoContext = createContext({});

// create a provider component

const FoundUserInfoProvider = ({ children }) => {
  const [foundUserInfo, setFoundUserInfo] = useState({
    name: "",
    email: "",
    description: "",
    foundDate: null,
    location: "",
    recipientDescription: "",
    file: null,
    terms: false,
    instruction: false,
  });

  //export the context to use it on the app level
  return (
    <FoundUserInfoContext.Provider value={{ foundUserInfo, setFoundUserInfo }}>
      {children}
    </FoundUserInfoContext.Provider>
  );
};

// custom hook to use the FoundUserInfoContext
const useFoundUserInfo = () => {
  return useContext(FoundUserInfoContext);
};

export { FoundUserInfoProvider, useFoundUserInfo };
