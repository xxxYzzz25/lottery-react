import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { lotteryReducer } from './lottery/reducers';

const rootReducer = combineReducers({
  lottery: lotteryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares: Middleware[] = [thunk];

middlewares.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
