import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import rootReducer from './login/loginStore';

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,

  },
});
