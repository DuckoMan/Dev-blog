import { combineReducers } from "redux";
import { alertReducer } from './reducers/alertReducer'
import  { authReducer } from './reducers/authReducer'

//ГЛОБАЛЬНЫЙ REDUCER
export const rootReducer = combineReducers({
    alerts:alertReducer,
    auth:authReducer
})