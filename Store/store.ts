// Create the store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import { authApi } from "./Auth/authApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer, // Add reduser from the api
        auth: authReducer, // Add reduser from the slice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware), // Add middleware from the api so RTK Query can work properly
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;