import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const registerUser = async ({
  fullname,
  email,
  password,
  contact,
  role,
}) => {
  const response = await authApiInstance.post("/register", {
    email,
    contact,
    password,
    fullname,
    role,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await authApiInstance.post("/login", { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await authApiInstance.get("/me");
  return response.data;
};

export const updateRole = async (role) => {
  const response = await authApiInstance.patch("/role", { role });
  return response.data;
};

export const updateProfile = async ({ fullname, contact }) => {
  const response = await authApiInstance.patch("/profile", { fullname, contact });
  return response.data;
};
