// import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import ContentLoader from "react-content-loader";

const CartSkeleton = () => {
  const renderCartSkeleton = Array(4)
    .fill(0 as any)
    .map((_, idx) => (
      <ContentLoader
        key={idx}
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="112" y="7" rx="3" ry="3" width="88" height="8" />
        <rect x="113" y="31" rx="3" ry="3" width="52" height="4" />
        <rect x="11" y="4" rx="0" ry="0" width="78" height="132" />
        <rect x="111" y="93" rx="3" ry="3" width="89" height="24" />
        <rect x="421" y="66" rx="0" ry="0" width="73" height="7" />
        <rect x="422" y="85" rx="3" ry="3" width="61" height="17" />
      </ContentLoader>
    ));
  return <>{renderCartSkeleton}</>;
};

export default CartSkeleton;
