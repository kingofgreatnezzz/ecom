import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS, 
  CART_RESET,
  CART_INCREASE_QUANTITY,
  CART_DECREASE_QUANTITY,
} from "../constants/cartConstants";

// Action to add item to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.product_name,
      image: data.product_img,
      price: data.price,
      countInstock: data.stock_count,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Action to remove item from cart
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action to increase item quantity
export const increaseQuantity = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_INCREASE_QUANTITY,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action to decrease item quantity
export const decreaseQuantity = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_DECREASE_QUANTITY,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const resetCart = () => (dispatch) => {
  dispatch({
    type: CART_RESET,
  });
  localStorage.removeItem("cartItems");
};
