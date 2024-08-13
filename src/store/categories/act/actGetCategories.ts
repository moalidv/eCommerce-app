import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICategoriesState } from "../categoriesSlice";
import { TCategory } from "@customTypes/category";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        "http://localhost:3005/categories"
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message || err.message);
      } else {
        return rejectWithValue("An error occurred while fetching categories.");
      }
    }
  }
);

export default actGetCategories;
