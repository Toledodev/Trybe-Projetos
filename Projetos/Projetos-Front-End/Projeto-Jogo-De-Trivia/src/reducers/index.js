import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import playerDataReducer from './playerDataReducer';

const rootReducer = combineReducers({ tokenReducer, playerDataReducer });

export default rootReducer;
