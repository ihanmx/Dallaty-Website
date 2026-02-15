import { useEffect, useState } from "react";

const getLocalValue = (key, initialValue) => {
  //for SSR like nextJS
  if (typeof window === "undefined") {
    return initialValue;
  }

  //if value is in local storage then return it
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  //if not in the local use initial value

  //if the initial value sent as func

  if (initialValue instanceof Function) {
    return initialValue(); //call it to get the value
  } else {
    return initialValue;
  }
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.getItem(key, JSON.stringify(value));
  }, [key, value]); //check on local storage when ever the key or value changes and set them with the localstorage

  return [value, setValue]; //return the state to the caller function
};

export default useLocalStorage;
