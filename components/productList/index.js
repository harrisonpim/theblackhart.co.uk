import Product from "./product";

export default function ProductList({ products }) {
  return (
    <div className="grid gap-x-3 gap-y-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
}
