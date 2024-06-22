import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationRead } from '../../redux/actions/notificationAction';

function Notifications() {
  const dispatch = useDispatch();

  const notificationList = useSelector((state) => state.notificationList);
  const { loading, error, notifications } = notificationList;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <div className="notification-dropdown">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={notification.is_read ? 'read' : 'unread'}>
              {notification.message}
              {!notification.is_read && (
                <button onClick={() => handleMarkAsRead(notification.id)}>Mark as read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
