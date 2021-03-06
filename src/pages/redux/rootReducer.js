import { combineReducers } from 'redux'
import { alertReducer } from './reducers/alertReducer'
import { authReducer } from './reducers/authReducer'
import { articleAddingReducer } from './reducers/articleAddingReducer'

export const rootReducer = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    article: articleAddingReducer,
})
