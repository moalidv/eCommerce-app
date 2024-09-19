import { Form, Button } from "react-bootstrap";
import { TProduct } from "@types";
import styles from "./styles.module.css";
import { memo } from "react";
import ProductInfo from "../productInfo/ProductInfo";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    img,
    title,
    price,
    quantity,
    max,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +e.target.value;
      changeQuantityHandler(id as number, quantity);
    };

    return (
      <div className={cartItem}>
        {/* <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandler(id as number)}
            >
              Remove
            </Button>
          </div>
        </div> */}
        <ProductInfo direction="column" title={title} price={price} img={img}>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id as number)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
