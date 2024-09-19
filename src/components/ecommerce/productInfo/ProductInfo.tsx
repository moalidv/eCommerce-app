import styles from "./styles.module.css";

styles;

type ProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ProductInfo = ({
  direction = "row",
  img,
  price,
  title,
  children,
  style,
}: ProductInfoProps) => {
  return (
    <div className={styles[`product-${direction}`]} style={style}>
      <div className={styles[`productImg-${direction}`]}>
        <img src={img} alt={title} />
      </div>
      <div className={styles[`productInfo-${direction}`]}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
