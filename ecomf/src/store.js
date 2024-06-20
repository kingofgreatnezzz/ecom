import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducers, productListReducers, productSearchReducer } from './redux/reducers/productReducers';
import { userLoginReducers, userSignupReducers } from './redux/reducers/userReducers';
import { cartReducers } from './redux/reducers/cartReducers';
import { orderCreateReducer } from './redux/reducers/orderReducers';
import { notificationReducer } from './redux/reducers/notificationReducer';



const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  cart: cartReducers,
  orderCreate: orderCreateReducer,
  notificationList: notificationReducer,
  productSearch: productSearchReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const ordersFromStorage = localStorage.getItem('orders')
  ? JSON.parse(localStorage.getItem('orders'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  orderCreate: { order: ordersFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
