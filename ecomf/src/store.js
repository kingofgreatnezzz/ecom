import {createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducers, productListReducers } from './redux/reducers/productReducers'
import { userLoginReducers, userSignupReducers } from './redux/reducers/userReducers';


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLoginReducers,
    userSignup: userSignupReducers,



})
    
const initialState ={}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store