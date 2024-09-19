import { TProduct, TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";

export interface IProducts {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProducts = {
  records: [],
  loading: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      // if (action.payload && typeof action.payload == "string") {
      //   state.error = action.payload;

      // }
      // state.error = action.payload as string;
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
