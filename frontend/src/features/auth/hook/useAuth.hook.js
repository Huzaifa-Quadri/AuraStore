import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../state/auth.slice";
import { loginUser, registerUser, getMe, updateRole, updateProfile } from "../services/auth.api";

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

      // Return the full outer payload so the component can read 'res.success'
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      dispatch(setError(message));
      return error.response?.data || { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const response = await loginUser({ email, password });
      dispatch(setUser(response.data.user));

      // Return the full outer payload so the component can read 'res.success'
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Network error. Please try again.";
      dispatch(setError(message));
      return error.response?.data || { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function initAuth() {
    try {
      dispatch(setLoading(true));
      const response = await getMe();
      dispatch(setUser(response.data.user));
      return response;
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleSelectRole(role) {
    try {
      dispatch(setLoading(true));
      const response = await updateRole(role);
      dispatch(setUser(response.data.user));
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update role.";
      dispatch(setError(message));
      return error.response?.data || { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleUpdateProfile({ fullname, contact }) {
    try {
      dispatch(setLoading(true));
      const response = await updateProfile({ fullname, contact });
      dispatch(setUser(response.data.user));
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update profile.";
      dispatch(setError(message));
      return error.response?.data || { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    initAuth,
    handleSelectRole,
    handleUpdateProfile,
  };
};
