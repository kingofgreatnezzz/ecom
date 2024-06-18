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

    return { success: true, data: createdOrder }; // Return success response

  } catch (error) {
    const errorMessage = error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
    
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMessage,
    });

    return { success: false, error: errorMessage }; // Return failure response
  }
};
