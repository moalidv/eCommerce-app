import { ICartState } from "@customTypes/cart";
import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cart from "./cart/cartSlice";
import categories, { ICategoriesState } from "./categories/categoriesSlice";
import products, { IProducts } from "./products/productsSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
});

const store: EnhancedStore<{
  categories: ICategoriesState;
  products: IProducts;
  cart: ICartState;
}> = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { persistor, store };
