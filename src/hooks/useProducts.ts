import { useAppDispatch, useAppSelector } from "@store/hook";
import actGetProductsByCatPrefix from "@store/products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const params = useParams();
  const cartItems = useAppSelector((state) => state.cart.items);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: el.id ? cartItems[el.id] : 0,
  }));

  useEffect(() => {
    // let prefix: string;
    // if (params.prefix && typeof params.prefix == "string") {
    //   prefix = params.prefix;
    //   dispatch<any>(actGetProductsByCatPrefix(prefix));
    // }
    const promise = dispatch<any>(
      actGetProductsByCatPrefix(params.prefix as string)
    );
    return () => {
      productsCleanUp();
      promise.abort();
    };
  }, [dispatch, params]);

  return { productPrefix: params.prefix, loading, error, productsFullInfo };
};

export default useProducts;
