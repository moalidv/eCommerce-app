import { TProduct } from "./product";
import { TLoading } from "./shared";

export interface ICartState {
  items: { [key: number]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
  totalPrice: number;
}
