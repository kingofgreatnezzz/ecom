import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    MARK_NOTIFICATION_READ,
} from '../constants/notificationConstant';

export const notificationReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUEST:
            return { loading: true, notifications: [] };
        case FETCH_NOTIFICATIONS_SUCCESS:
            return { loading: false, notifications: action.payload };
        case FETCH_NOTIFICATIONS_FAILURE:
            return { loading: false, error: action.payload };
        case MARK_NOTIFICATION_READ:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    notification.id === action.payload
                        ? { ...notification, is_read: true }
                        : notification
                ),
            };
        default:
            return state;
    }
};
