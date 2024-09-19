import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading } from "@types";
import { actAuthRegister } from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

export interface IAuthState {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      // state.user = null;
      // state.accessToken = null;
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    builder.addCase(actAuthLogin.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
