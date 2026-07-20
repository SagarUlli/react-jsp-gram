import api from "./api";
import api from "./api";

export const getCurrentUser = async () => {
  const response = await api.get("/api/me");
  return response.data;
};

export const getProfile = () => {
  return api.get("/users/profile");
};

export const updateProfile = (formData) => {
  return api.put("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
