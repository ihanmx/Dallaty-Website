import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import axios from '../api/axios';

const useLogout = () => {
  const { setAuth } = useContext(AuthContext);

  const logout = async () => {
    try {
      await axios.post('/admin/logout', {}, { withCredentials: true });
    } catch (err) {
      // Optionally handle error
    } finally {
      setAuth({});
      localStorage.removeItem('persist');
    }
  };

  return logout;
};

export default useLogout;
