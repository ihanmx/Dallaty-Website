import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash } = location; //extract path and hash from router location

  useEffect(() => {
    if (hash) {
      // for smooth
      setTimeout(() => {
        const element = document.querySelector(hash); //handle ids # like /about#frqs
        if (element) {
          element.scrollIntoView({ bahavior: "smooth" }); //move to specific element
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); //access widow and scrol to the element
    }
  }, [hash, pathname]);

  return null; // This component doesn’t render anything
  //mov ethe entire page to top
};

export default ScrollToTop; // we use it as achild of Routes wrapper to move to # and element top
