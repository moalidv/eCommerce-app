import { createSlice } from "@reduxjs/toolkit";
// import { actGetProductsByItems } from "./act/actGetProductsByItems";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { ICartState, isString } from "@types";

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (item) => item.id !== action.payload
      );
    },
    cartSubTotalPrice: (state) => {
      if (!Object.keys(state.items).length) return;
      for (let key in state.items) {
        const itemPrice = state.productsFullInfo.find(
          (item) => (item.id as number) == +key
        )?.price;
        state.totalPrice += (itemPrice as number) * state.items[key];
      }
    },
    cleanupCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      // if (action.payload && typeof action.payload === "string") {
      //   state.error = action.payload;
      // }
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cartSubTotalPrice,
  cleanupCartProductsFullInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
