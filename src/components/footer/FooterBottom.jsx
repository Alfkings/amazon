import React from "react";
import { footerBottomItem } from "../../constants/Index";

const FooterBottom = () => {
  return (
    <div className="w-full py-8 bg-footerBottom">
      <div className="max-w-5xl px-4 mx-auto">
        <div className="grid w-full grid-cols-3 gap-3 text-gray-400 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 place-content-center">
          {footerBottomItem.map((item) => (
            <div className="cursor-pointer group" key={item.id}>
              <h3 className="footerBottomTitle">{item.title}</h3>
              <p className="footerBottomText">{item.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
