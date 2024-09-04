import { useAppSelector } from "@store/hook";
import styles from "./styles.module.css";
import Logo from "@assets/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { container, basketQuantity, pumpCartQuantity } = styles;

const HeaderBasket = () => {
  const navigate = useNavigate();
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (totalQuantity === 0) return;
    setIsAnimated(true);
    const debounce = setTimeout(() => {
      setIsAnimated(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <Logo title="basket icon" />
      <div
        className={`${basketQuantity} ${isAnimated ? pumpCartQuantity : ""}`}
      >
        {totalQuantity}
      </div>
    </div>
  );
};

export default HeaderBasket;
