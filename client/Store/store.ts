// Create the store
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import { authApi } from "./Auth/authApi";
import { vehicleApi } from "./Vehicle/vehicleApi";
import { bookingApi } from "./Booking/bookingApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      vehicleApi.middleware,
      bookingApi.middleware
    ),
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
