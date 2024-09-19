import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post<TResponse>("/login", formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actAuthLogin;
