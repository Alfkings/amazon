import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../redux/amazonSliceCopy";
import { Link } from "react-router-dom";

const FooterTop = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const userInfo = useSelector((state) => state.amazon.userInfo);

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
    <div className="w-full py-6 bg-white">
      <div className="w-full bottom-t-[1px] border-b-[1px] py-8">
        {userInfo ? (
          <div>
            <div className="flex flex-col w-64 gap-1 mx-auto text-center ">
              <button
                onClick={handleLogOut}
                className="w-full py-1 font-semibold bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-64 gap-1 mx-auto text-center ">
            <p className="text-sm">See Personalized Recommendations</p>
            <Link to="/signin">
              <button className="w-full py-1 font-semibold bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700">
                Sign In
              </button>
            </Link>
            <p className="text-xs-mt-1">
              New Customer?
              <Link to="/registration">
                <span className="ml-1 text-blue-600 cursor-pointer">
                  Start Here
                </span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterTop;
