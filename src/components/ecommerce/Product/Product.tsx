import { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hook";
import { memo, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

const { product, productImg } = styles;

const Product = memo(({ title, price, img, id, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsActive(false);
  };

  const currentRemainingQuantity = max - (quantity ?? 0);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (currentRemainingQuantity == 0) return;
      setIsActive(true);
    }, 200);
    return () => clearTimeout(debounce);
  }, [isActive]);

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt="" />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)}</h3>
      <Button
        onClick={addToCartHandler}
        variant="info"
        style={{ color: "white" }}
        disabled={!isActive}
      >
        {!isActive ? (
          currentRemainingQuantity === 0 ? (
            "is over"
          ) : (
            <>
              <Spinner animation="border" size="sm" /> loading...
            </>
          )
        ) : (
          "add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
