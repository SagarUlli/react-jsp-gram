import api from "./api";

export const registerUser = (data) => {
  return api.post("/users/register", data);
};

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

export const getUserProfile = (id) => {
  return api.get(`/users/${id}`);
};

export const followUser = (id) => {
  return api.post(`/users/${id}/follow`);
};

export const unfollowUser = (id) => {
  return api.delete(`/users/${id}/follow`);
};

export const getSuggestions = () => {
  return api.get("/users/suggestions");
};

export const getFollowers = () => {
  return api.get("/users/followers");
};

export const getFollowing = () => {
  return api.get("/users/following");
};
