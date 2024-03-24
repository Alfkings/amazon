import React from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart, addToWishList } from "../../redux/amazonSliceCopy";
const Product = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const productsData = data.data;
  return (
    <div className="grid grid-cols-1 gap-6 px-4 mx-auto md:grid-cols-2 xl:grid-cols-4 max-w-screen-2xl">
      {productsData.map((items) => (
        <div
          key={items.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-textShadow duration-200 relative flex flex-col gap-2"
        >
          <span className="absolute text-xs italic text-gray-500 capitalize top-2 right-2">
            {items.category}
          </span>
          <div className="relative flex items-center justify-center w-full h-auto group">
            <img
              className="object-contain h-64 w-52"
              src={items.image}
              alt="ProductImg"
            />

            <ul className="absolute bottom-[-150px] flex flex-col items-end justify-center w-full gap-2 px-2 bg-gray-100 border-r h-36 font-titleFont border-1 group-hover:bottom-0 duration-700">
              <li className="productLi">
                Compare
                <span>
                  <ApiIcon />
                </span>
              </li>
              <li
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: items.id,
                      title: items.title,
                      description: items.description,
                      price: items.price,
                      category: items.category,
                      image: items.image,
                      quantity: 1,
                    })
                  )
                }
                className="productLi"
              >
                Add to Cart
                <span>
                  <ShoppingCartIcon />
                </span>
              </li>
              <li className="productLi">
                View Details
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </li>
              <li
                
                className="productLi"
              >
                Add to Wish List
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
          </div>
          <div className="z-10 px-4 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-wide font-titleFont text-amazon_blue">
                {items.title.substring(0, 20)}
              </h2>
              <p className="text-sm font-semibold text-gray-600">
                ${items.price}
              </p>
            </div>
            <div>
              <p className="text-sm">
                {items.description.substring(0, 100)}...
              </p>
              <div className="text-yellow-500">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: items.id,
                      title: items.title,
                      description: items.description,
                      price: items.price,
                      category: items.category,
                      image: items.image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
