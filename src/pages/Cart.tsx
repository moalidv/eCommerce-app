import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { error, loading, products, removeItemHandler, changeQuantityHandler } =
    useCart();

  return (
    <>
      <Heading title="Cart" />
      <Loading error={error} loading={loading}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />

            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <h2>the cart is empty</h2>
        )}
      </Loading>
    </>
  );
};

export default Cart;
