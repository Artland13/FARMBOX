import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApiSlice } from './reducers/userApiSlice';
import { userSlice } from './reducers/UserSlice';
import { productApiSlice } from './reducers/productApiSlice';
import { positionSlice } from './reducers/positionSlice';

export const setupStore = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [positionSlice.name]: positionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(productApiSlice.middleware),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type appDispatch = typeof setupStore.dispatch;

setupListeners(setupStore.dispatch);
