import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../state/auth.slice";
import { registerUser } from "../services/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    role = "buyer",
  }) {
    try {
      dispatch(setLoading(true));
      const response = await registerUser({
        email,
        contact,
        password,
        fullname,
        role,
      });
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error) {
      dispatch(setError(error.response.data.message));
      return error.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
  };
};
