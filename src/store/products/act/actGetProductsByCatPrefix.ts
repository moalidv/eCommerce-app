import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];

export const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message || err.message);
      } else {
        return rejectWithValue("unexpected error: ");
      }
    }
  }
);

export default actGetProductsByCatPrefix;
