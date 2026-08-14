import api from "./api";

export const bookmarkPost = (postId) => {
  return api.post(`/bookmarks/${postId}`);
};

export const unbookmarkPost = (postId) => {
  return api.delete(`/bookmarks/${postId}`);
};

export const getBookmarks = () => {
  return api.get("/bookmarks");
};
