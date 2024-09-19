import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/category/CategorySkeleton";
import ProductSkeleton from "../skeletons/product/ProductSkeleton";
import CartSkeleton from "../skeletons/cart/CartSkeleton";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};

const Loading = ({
  loading,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonTypes[type];

  if (loading === "pending") {
    return <Component />;
  }
  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }
  return <>{children}</>;
};

export default Loading;
