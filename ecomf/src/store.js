import {createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducers, productListReducers } from './redux/reducers/productReducers'
import { userLoginReducers, userSignupReducers } from './redux/reducers/userReducers';
import {cartReducers} from"./redux/reducers/cartReducers"


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,
    cart: cartReducers,



})
const cartItemFromStorage = localStorage.getItem("cartItems")?
JSON.parse(localStorage.getItem('cartItems')):[]


const initialState ={
    cart:{cartItems:cartItemFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store