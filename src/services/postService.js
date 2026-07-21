import api from "./api";

export const getFeed = () => {
  return api.get("/posts");
};

export const createPost = (formData) => {
  return api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const likePost = (id) => {
  return api.post(`/posts/${id}/like`);
};

export const unlikePost = (id) => {
  return api.delete(`/posts/${id}/like`);
};

export const getComments = (id) => {
  return api.get(`/comments/${id}/comments`);
};

export const addComment = (id, data) => {
  return api.post(`/comments/${id}/comments`, data);
};

export const deleteComment = (id) => {
  return api.delete(`/comments/${id}`);
};

export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

export const updatePost = (id, formData) => {
  return api.put(`/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};
