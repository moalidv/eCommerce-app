import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProduct } from "@types";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItmes",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    try {
      if (!itemsId.length) {
        return fulfillWithValue([]);
      }
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        { signal }
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message || err.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actGetProductsByItems;
