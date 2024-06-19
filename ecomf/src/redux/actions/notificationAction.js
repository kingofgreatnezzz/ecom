import axios from 'axios';
import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    MARK_NOTIFICATION_READ,
} from '../constants/notificationConstant';

export const fetchNotifications = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.tokens.access}`,
            },
        };

        const { data } = await axios.get('/api/notifications/', config);
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: data });

        // Optionally store in local storage
        localStorage.setItem('notifications', JSON.stringify(data));
    } catch (error) {
        // Load from local storage if there's an error
        const localNotifications = localStorage.getItem('notifications');
        if (localNotifications) {
            dispatch({
                type: FETCH_NOTIFICATIONS_SUCCESS,
                payload: JSON.parse(localNotifications),
            });
        } else {
            dispatch({
                type: FETCH_NOTIFICATIONS_FAILURE,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            });
        }
    }
};

export const markNotificationRead = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.tokens.access}`,
            },
        };

        await axios.patch(`/api/notifications/${id}/`, { is_read: true }, config);

        dispatch({ type: MARK_NOTIFICATION_READ, payload: id });

        // Update local storage
        const { notificationList: { notifications } } = getState();
        const updatedNotifications = notifications.map((notification) =>
            notification.id === id ? { ...notification, is_read: true } : notification
        );
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
        console.error('Error marking notification as read', error);
    }
};
