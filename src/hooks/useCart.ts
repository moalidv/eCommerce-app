import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import React, { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id as number],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch<any>(actGetProductsByItems());

    return () => {
      dispatch(cleanupCartProductsFullInfo());
    };
  }, [dispatch]);
  return { error, loading, products, changeQuantityHandler, removeItemHandler };
};

export default useCart;
