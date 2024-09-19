import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { isString, TCategory, TLoading } from "@types";

export interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategoryRecords: (state) => {
      state.records = [];
    },
  },
  // extraReducers: {
  //   [actGetCategories.pending]: (state, action) => {},
  //   [actGetCategories.fulfilled]: (state, action) => {},
  //   [actGetCategories.rejected]: (state, action) => {},
  // },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
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

export { actGetCategories };
export const { cleanUpCategoryRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;
