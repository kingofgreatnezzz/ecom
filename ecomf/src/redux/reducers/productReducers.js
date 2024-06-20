import {
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  PRODUCTS_LIST_SUCCESS,
  SEARCH_PRODUCTS_CLEAR,
} from "../constants/productsConstant";


const initialState = {
  product: [],
  products: [],
  loading: false,
  error: null,
};


export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
      case SEARCH_PRODUCTS_REQUEST:
          return { loading: true, products: [] };
      case SEARCH_PRODUCTS_SUCCESS:
          return { loading: false, products: action.payload };
      case SEARCH_PRODUCTS_FAILURE:
          return { loading: false, error: action.payload };
      case SEARCH_PRODUCTS_CLEAR:
        return { loading: false, products: [] };
      default:
          return state;
  }
};


export const productListReducers = (state =  initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const productDetailsReducers = (state={product:[]}, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {loading: false,product: action.payload,
      };
    case PRODUCTS_DETAILS_FAIL:
      return {loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
