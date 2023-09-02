import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import deckReducer from './slices/deckSlice';
import { cardApiSlice } from './slices/cardApiSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        deck: deckReducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;