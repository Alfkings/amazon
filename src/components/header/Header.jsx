import React, { useEffect, useRef, useState } from "react";
import { logo } from "../../assets/index";
import PlaceIcon from "@mui/icons-material/Place";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { allItems } from "../../constants/Index";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../../redux/amazonSliceCopy";

const Header = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);

  const ref = useRef();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signOut successfully");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sticky top-0 z-50 w-full ">
      <div className="flex items-center w-full gap-4 px-4 py-3 mx-auto text-white bg-amazon_blue ">
        {/* ====Image Start here==== */}
        <Link to="/">
          {" "}
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>
        {/* ====Image  End  here==== */}
        {/* ==Delivery Start here=== */}
        <div className="hidden headerHover mdl:inline-flex">
          <PlaceIcon />
          <p className="flex flex-col text-sm font-light text-lightText">
            Deliver to
            <span className="text-sm font-semibold-mt-1 text-whiteText">
              India
            </span>
          </p>
        </div>
        {/* ===Delivery End  here=== */}
        {/* ===Search Start here===  */}
        <div className="relative flex-grow hidden h-10 rounded-md lgl:flex ">
          <span
            onClick={() => setShowAll(!showAll)}
            className="flex items-center justify-center h-full text-sm duration-300 bg-gray-300 border-2 w-14 curdor-pointer text-amazon_blue font-titleFont rounded-tl-md rounded-bl-md"
          >
            All
            <span>
              <ArrowDropDownIcon />
            </span>
          </span>
          {showAll && (
            <div>
              <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50">
                {allItems.map((item, id) => (
                  <li
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                    key={id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            className="flex-grow h-full px-2 text-base border-none outline-none text-amazon_blue"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/* ==== Search End here==== */}
        {/* ===SignIn Start here===  */}
        <Link to="/signin">
          <div className="flex flex-col items-start justify-center headerHover">
            {userInfo ? (
              <p className="text-sm text-gray-100 mdl:text-sm mdl:font-medium mdl:text-lightText">
                {userInfo.userName}
              </p>
            ) : (
              <p className="text-xs text-gray-100 mdl:text-xs mdl:font-medium mdl:text-lightText">
                Hello, SIgn In
              </p>
            )}

            <p className="hidden -mt-1 text-sm font-semibold text-whiteText mdl:inline-flex">
              Accounts & Lists{" "}
              <span>
                <ArrowDropDownIcon />
              </span>
            </p>
          </div>
        </Link>
        {/*  === SignIn End here===  */}
        {/* ===Orders Start here===  */}
        <div className="flex-col items-start justify-center hidden lgl:flex headerHover">
          <p className="text-xs font-light text-lightText">Returns</p>
          <p className="-mt-1 text-sm font-semibold text-whiteText">Orders</p>
        </div>
        {/* === Orders End here===   */}
        {/* == =Carts Start here===  */}

        <Link to="/cart">
          <div className="relative flex items-start justify-center headerHover">
            <ShoppingCartIcon />
            <p className="mt-3 text-xs font-semibold text-whiteText">
              Cart
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {userInfo && (
          <div
            onClick={handleLogOut}
            className="relative flex flex-col items-center justify-center headerHover"
          >
            <LogoutIcon />
            <p className="hidden text-xs font-semibold mdl:inline-flex text-whiteText">
              Log Out
            </p>
          </div>
        )}
        {/*   ===Carts End here===   */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
