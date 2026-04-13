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
