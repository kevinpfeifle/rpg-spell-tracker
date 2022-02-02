import { combineReducers } from 'redux';
import userReducer from './userReducer';
import characterReducer from './characterReducer';
// import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  character: characterReducer
});

export default rootReducer;