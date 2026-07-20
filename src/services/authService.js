import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", {
    username,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};
