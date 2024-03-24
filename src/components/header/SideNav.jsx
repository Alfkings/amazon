import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SideNav = ({ title, one, two, three }) => {
  return (
    <div className="py-3 border-b-[1px] border-b-grey-300">
      <h3 className="px-6 mb-1 text-lg font-semibold font-titleFont">
        {title}
      </h3>
      <ul className="text-sm">
        <li className="flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-200">
          {one}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
        <li className="flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-200">
          {two}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
        <li className="flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-200">
          {three}
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
