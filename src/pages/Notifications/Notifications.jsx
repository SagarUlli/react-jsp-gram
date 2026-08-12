import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Notifications</h3>

        {notifications.some((n) => !n.read) && (
          <button className="btn btn-outline-primary" onClick={handleReadAll}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 && <p>No notifications.</p>}

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`card p-3 mb-2 ${
            !notification.read ? "border-primary" : ""
          }`}
          onClick={() => !notification.read && handleRead(notification.id)}
        >
          <Link
            to={`/users/${notification.senderId}`}
            className="text-decoration-none"
          >
            {notification.senderUsername}
          </Link>

          <p className="mb-1">{notification.message}</p>

          <small className="text-muted">{notification.type}</small>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
