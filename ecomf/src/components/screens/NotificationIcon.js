import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../redux/actions/notificationAction';

import { IoMdNotifications } from "react-icons/io";

function NotificationIcon() {
  const dispatch = useDispatch();
  const notificationList = useSelector((state) => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unreadCount = notifications ? notifications.filter(n => !n.is_read).length : 0;

  return (
    <div className="relative">
      <button className="relative text-gray-600 dark:text-gray-300 focus:outline-none">
      
      <IoMdNotifications className="h-7 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}

export default NotificationIcon;
