import Link from "next/link";
import { formatPrice } from "../price";

export default function CheckoutButton({ price, shipping }) {
  const total = price + shipping;
  const displayTotal = formatPrice(total);
  return (
    <button className="w-full py-3 rounded-sm border border-solid border-white hover:text-black hover:bg-white hover:text-black transition duration-200 ease-in-out">
      {/* {displayTotal} */}
      Add to basket
    </button>
  );
}
// <button class="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
