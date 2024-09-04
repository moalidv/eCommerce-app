import CartItem from "../cartItem/CartItem";
import { TProduct } from "@customTypes/product";

type CartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemListProps) => {
  const renderList = products.map((p) => (
    <CartItem
      removeItemHandler={removeItemHandler}
      changeQuantityHandler={changeQuantityHandler}
      key={p.id}
      {...p}
    />
  ));
  return <div>{renderList}</div>;
};

export default CartItemList;
