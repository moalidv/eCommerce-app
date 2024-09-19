import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/register", formData);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message || error.response?.data.message);
      } else {
        return rejectWithValue("unexpected error");
      }
    }
  }
);
