import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adReducer from "./adSlice";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persistence configuration for auth
const authPersistConfig = {
  key: "auth", // This key will be used to store the auth slice in local storage
  storage, // Storage type (localStorage by default)
};

// Persisting only the auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Combine reducers with persisted auth and normal ads reducer
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  ads: adReducer, // Ads do not need to be persisted
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions related to redux-persist (required for proper persistence handling)
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"], // Avoid serializability warnings
      },
    }),
});

// Create a persistor for the persisted store
export const persistor = persistStore(store);

// Export the store for use in your app
export default store;
  