// cartActions.js
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import axios from "axios";

// Action to add item to cart
export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.product_name,
            image:data.product_img,
            price: data.price,
            countInstock: data.stock_count,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

// Action to remove item from cart
export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};
