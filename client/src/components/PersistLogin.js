import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        // Optionally handle error
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
    return () => { isMounted = false; };
  }, [auth?.accessToken, persist, refresh]);

  if (!persist) {
    return <Outlet />;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return <Outlet />;
  }
};

export default PersistLogin;
