import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import categories, { ICategoriesState } from "./categories/categoriesSlice";
import products, { IProducts } from "./products/productsSlice";

export const store: EnhancedStore<{
  categories: ICategoriesState;
  products: IProducts;
}> = configureStore({
  reducer: {
    categories,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
