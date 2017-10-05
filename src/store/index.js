import { createStore, applyMiddleware, combineReducers } from "redux";
import MyReducer from './reducers/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    MyReducer
});

const middleware = applyMiddleware(thunk);

let store = createStore(rootReducer, middleware);

export default store;
