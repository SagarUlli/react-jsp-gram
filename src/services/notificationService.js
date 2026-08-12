import api from "./api";

export const getNotifications = () => {
  return api.get("/notifications");
};

export const getUnreadNotificationCount = () => {
  return api.get("/notifications/unread-count");
};

export const markNotificationAsRead = (id) => {
  return api.post(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = () => {
  return api.post("/notifications/read-all");
};
