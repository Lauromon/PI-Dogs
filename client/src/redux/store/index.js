import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer  from '../reducers/reducer'
import thunk from 'redux-thunk';

const composeEnhancer = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;