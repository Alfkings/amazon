import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items items-center ">
      {/* ====ListItems Start Here=== */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSidebar(!sidebar)}
          className="flex items-center gap-1 headerHover"
        >
          <MenuIcon />
          All
        </li>
        <li className="hidden headerHover md:inline-flex">Today's Deal</li>
        <li className="hidden headerHover md:inline-flex">Customer Services</li>
        <li className="hidden headerHover md:inline-flex">Gift Cards</li>
        <li className="hidden headerHover md:inline-flex">Registery</li>
        <li className="hidden headerHover md:inline-flex">Sell</li>
      </ul>
      {/* ====ListItems End Here====  */}
      {/* ====SideNav Start Here====  */}
      {sidebar && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen text-black bg-opacity-50 bg-amazon_blue">
          <div className="relative w-full h-full">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black"
            >
              <div className="flex items-center w-full gap-4 px-6 py-2 text-white bg-amazon_light">
                {userInfo ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userInfo.image}
                    alt="UserImg"
                  />
                ) : (
                  <AccountCircleIcon />
                )}
                {userInfo ? (
                  <h3 className="text-lg font-bold tracking-wide font-titleFont">
                    {userInfo.userName}
                  </h3>
                ) : (
                  <h3 className="text-lg font-bold tracking-wide font-titleFont">
                    Hello, Sign In
                  </h3>
                )}
              </div>
              <SideNav
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNav
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="smart Home"
              />
              <SideNav
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon live"
                three="International Shopping"
              />
              <SideNav
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Contact us"
              />
              <span
                onClick={() => setSidebar(false)}
                className="cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center bg-gray-200 border  hover:bg-red-500 hover:text-white duration-300 "
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
      {/*   ====SideNav End Here====  */}
    </div>
  );
};

export default HeaderBottom;
