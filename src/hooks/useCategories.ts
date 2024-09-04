import {
  actGetCategories,
  cleanUpCategoryRecords,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import React, { useEffect } from "react";

const useCategories = () => {
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!records.length) {
      dispatch<any>(actGetCategories());
    }

    return () => {
      dispatch(cleanUpCategoryRecords());
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useCategories;
