import Image from "next/image";

export default function BasketItem({ product }) {
  return (
    <div className="w-full h-16">
      <div className="h-16 w-16">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2>{product.name}</h2>
      <div>{product.price}</div>
      <div>{quantity}</div>
    </div>
  );
}
