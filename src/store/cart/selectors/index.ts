import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

export const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return (
      (Object.values(items).length > 0 &&
        Object.values(items).reduce((a, b) => a + b)) ||
      0
    );
  }
);
