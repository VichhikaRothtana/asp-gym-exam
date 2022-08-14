import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth() as any;

  const logout = async () => {
    try {
      setAuth({});
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
