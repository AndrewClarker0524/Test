import { createStore } from 'redux';
import { bookReducer } from './reducers';

export const store = createStore(bookReducer);
