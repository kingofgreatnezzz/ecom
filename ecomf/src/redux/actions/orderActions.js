import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.tokens.access}`, // Ensure only access token is included
      },
    };

    const { data } = await axios.post('/api/orders/add/', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // Store order in localStorage
    const {
      orderCreate: { order: createdOrder },
    } = getState();
    localStorage.setItem('orders', JSON.stringify(createdOrder));

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
