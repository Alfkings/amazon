import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import { middleList } from "../../constants/Index";
import { IdImage, logo } from "../../assets";

const FooterMiddle = () => {
  return (
    <div className="w-full text-white bg-amazon_light">
      {/* =====Top Start Here===== */}
      <div className="w-full border-b-[1px] border-gray-500 p-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="grid w-full grid-cols-1 gap-6 md:items-start md:grid-cols-2 lgl:grid-cols-4 md:place-items-center">
            {middleList.map((item) => (
              <FooterMiddleList
                key={item.id}
                title={item.title}
                listItem={item.listItem}
              />
            ))}
          </div>
        </div>
      </div>
      {/* =====Top Ends Here=====  */}
      {/* ====Bottom Start Here====*/}
      <div className="flex items-center justify-center w-full gap-6 py-6 ">
        <img className="w-20 pt-3" src={logo} alt="logo" />

        <div className="flex gap-2">
          <p className="flex items-center justify-center gap-1 px-2 py-1 duration-200 border border-gray-500 cursor-pointer hover:border-amazon_yellow">
            English
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 px-2 py-1 duration-200 border border-gray-500 cursor-pointer hover:border-amazon_yellow">
          <img className="w-6 " src={IdImage} alt="ID Image" />
          <p>India</p>
        </div>
      </div>
      {/* ====Bottom End Here====  */}
    </div>
  );
};

export default FooterMiddle;
