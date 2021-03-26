import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersRegisterReducer from '../reducers/usersRegisterReducer'
import loggedInUserReducer from '../reducers/loggedInUserReducer'
import customerInfoReducer from '../reducers/customerInfoReducer'
import productsInfoReducer from '../reducers/productsInfoReducer'

const configureStore = ()=>{
    const store =  createStore(combineReducers({
        registered_users : usersRegisterReducer,
        loggedIn_users : loggedInUserReducer,
        customers_info : customerInfoReducer,
        products_info : productsInfoReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore