import axios from "axios";
import {
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,

  SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILURE,
} from "../constants/productsConstant";

    

export const searchProducts = (query) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/products/search?q=${query}`);

        dispatch({ type: SEARCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCTS_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    });
    const { data } = await axios.get(`api/products/`);

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
