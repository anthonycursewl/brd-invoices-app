interface ProductDetailListProps {
    product: any;
    index: number
    parseNumber: (number: number) => string
}

export default function PaymentDetailList({ product, index, parseNumber }: ProductDetailListProps) {
  return (
    <div className="payments-products-select" key={index}>
      <div>
        <p className="p-index">{index + 1}</p>
      </div>
      <div className="p-desc">
        <p>{product.desc}</p>
      </div>
      <div>
        <p>x{product.quantity}</p>
      </div>
      <div>
        <p>{parseNumber(product.cost_u)}</p>
      </div>
      <div className="list-currency">
        <img src={product.currency.img} alt="" />
        <p>{product.currency.name}</p>
      </div>
      <div>
        <p>{parseNumber(product.cost_u * product.quantity)}</p>
      </div>
    </div>
  );
}
