import axios from "axios";

export const ProductData = async () => {
  const product = await axios.get(
    "https://fakestoreapiserver.vercel.app/amazonproducts"
  );
  return product;
};
