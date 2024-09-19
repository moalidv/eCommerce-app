import { TProduct } from "@types";
import styles from "./styles.module.css";

type CartSubtotalPriceComponentProps = {
  products: TProduct[];
};

const CartSubtotalPrice = ({ products }: CartSubtotalPriceComponentProps) => {
  const subtotal = products.reduce((acc, el) => {
    const price = el.price;
    const quantity = el.quantity || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal: </span>
      <span>{subtotal.toFixed(2)} EGP</span>
    </div>
  );
};

export default CartSubtotalPrice;
