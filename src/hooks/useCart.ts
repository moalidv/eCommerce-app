import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  console.log("products full info", productsFullInfo);
  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id as number],
  }));
  console.log(products);

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
    const promise = dispatch<any>(actGetProductsByItems());

    return () => {
      dispatch(cleanupCartProductsFullInfo());
      promise.abort();
    };
  }, [dispatch]);
  return { error, loading, products, changeQuantityHandler, removeItemHandler };
};

export default useCart;
