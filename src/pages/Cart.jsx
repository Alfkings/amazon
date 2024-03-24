import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/amazonSliceCopy";
import { emptyCart } from "../assets/index";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2));
    });
  }, [products]);

  return (
    <div className="w-full p-4 bg-gray-100">
      {products.length > 0 ? (
        <div className="container h-auto grid-cols-5 gap-8 mx-auto lg:grid ">
          <div className="w-full h-full col-span-4 px-4 bg-white">
            <div className="font-titleFont hidden mdl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-3xl font-semibold">Shopping Cart</h2>
              <h4 className="text-xl font-semibold">Subtotal</h4>
            </div>
            {/* Products */}
            <div>
              {products.map((item) => (
                <div
                  className="w-full border-b-[1px] border-b-gray-300 p-4 mdl:flex items-center gap-6"
                  key={item.id}
                >
                  <div className="items-center w-full gap-6 mdl:flex">
                    <div className=" mdl:w-1/5">
                      <img
                        className="justify-center mx-auto lg:object-contain h-44"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="mdl:w-4/5">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm ">
                        {item.description.substring(0, 100)}
                      </p>
                      <p className="text-base">
                        Unit Price
                        <span className="font-semibold">${item.price}</span>
                      </p>
                      <div className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p>Qty:</p>
                        <p
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="px-1 duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-400"
                        >
                          -
                        </p>
                        <p>{item.quantity}</p>
                        <p
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="px-1 duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-400"
                        >
                          +
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="py-1 mt-2 text-white duration-300 bg-red-500 rounded-lg w-36 hover:bg-red-700 active:bg-red-900"
                      >
                        Delete Item
                      </button>
                    </div>
                    <div>
                      <p className="text-lg font-semibold font-titleFont">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full py-2">
              <button
                onClick={() => dispatch(resetCart())}
                className="px-10 py-2 text-lg font-semibold tracking-wide text-white bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-500 font-titleFont"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full col-span-1 p-4 bg-white lg:h-60 xl:h-52 lg:mt-0 xs:mt-8">
            <div>
              <p className="flex items-start gap-2 text-sm">
                <span>
                  <CheckCircleIcon className="text-green-500 bg-white rounded-full" />
                </span>{" "}
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details....
              </p>
            </div>
            <div>
              <p className="flex items-center justify-between gap-2 px-10 py-1 font-semibold">
                Total: <span className="text-lg font-bold">${totalPrice}</span>
              </p>
            </div>
            <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:to-yellow-600 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-4 py-10"
        >
          <div>
            <img
              className="mx-auto w-80 rounded-lgp-4"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-md shadow-lg w-96">
            <h1 className="text-xl font-bold font-titleFont">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center">
              Your Shopping Cart lives to serve. Give it a purpose - fill it
              with the things you love! and make it Happy
            </p>
            <Link to="/">
              <button className="px-8 py-2 mt-6 text-lg font-semibold bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 font-titleFont">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
