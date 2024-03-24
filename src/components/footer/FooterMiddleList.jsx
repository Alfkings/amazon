import React from "react";

const FooterMiddleList = ({ title, listItem }) => {
  return (
    <div className="w-full">
      <h3 className="mb-3 text-base font-semibold text-white font-titleFont">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 font-bodyFont">
        {listItem.map((item) =>
          item.listData.map((data, index) => (
            <li key={index} className="footerLink">
              {data}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FooterMiddleList;
