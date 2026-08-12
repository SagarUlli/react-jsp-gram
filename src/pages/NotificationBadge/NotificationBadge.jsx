import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUnreadNotificationCount } from "../../services/notificationService";

function NotificationBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();

    const interval = setInterval(() => {
      loadUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();

      setCount(response.data.data || 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to="/notifications" className="nav-link position-relative">
      Notifications
      {count > 0 && (
        <span className="badge bg-danger ms-1">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

export default NotificationBadge;
