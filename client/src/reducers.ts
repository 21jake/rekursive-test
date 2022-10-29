import { combineReducers } from 'redux';
import checkout from './modules/checkout/checkout.reducer';


const rootReducer = combineReducers({ checkout });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
