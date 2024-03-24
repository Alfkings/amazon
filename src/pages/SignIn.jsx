import React, { useState } from "react";
import { DarkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSliceCopy";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [userEmailErr, setUserEmailErr] = useState("");
  const [errPassErr, setErrPassErr] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassWord = (e) => {
    setPassword(e.target.value);
    setErrEmail("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter Your Email");
    }
    if (!password) {
      setErrPassword("Enter Your Password");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );

          setLoading(false);
          setSuccessMsg("Loggedin Successfully! Welcome back!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid Email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setErrPassErr("Wrong Password! Try Again");
          }
          console.log("Something is up, Try with correct Creditional");
        });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full pb-10 bg-gray-100">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center">
            <Link to="/">
              <img className="w-32 mt-3" src={DarkLogo} alt="logo" />
            </Link>
            <div className="w-full p-6 border border-zinc-200">
              <h2 className="mb-4 text-3xl font-medium font-titleFont">
                Sign In
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    className="w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e7760] focus-within:shadow-amazonInput duration-100"
                    type="email"
                    value={email}
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="text-base italic font-extrabold font-titleFont">
                        !
                      </span>{" "}
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="text-base italic font-extrabold font-titleFont">
                        !
                      </span>{" "}
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handlePassWord}
                    className="w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e7760] focus-within:shadow-amazonInput duration-100"
                    type="password"
                    value={password}
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="text-base italic font-extrabold font-titleFont">
                        !
                      </span>{" "}
                      {errPassword}
                    </p>
                  )}
                  {errPassErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="text-base italic font-extrabold font-titleFont">
                        !
                      </span>{" "}
                      {errPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>
                {loading && (
                  <div className="flex justify-center">
                    <RotatingLines
                      visible={true}
                      height="50"
                      width="50"
                      color="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs leading-4 text-black">
                By Continuing, you agree to Amazon's{" "}
                <span className="text-blue-600">Conditions of Use</span> and{" "}
                <span className="text-blue-600">Private Notice</span>
              </p>
              <p className="mt-4 text-xs text-gray-600 cursor-pointer group">
                <ArrowRightIcon />
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                  need Help?
                </span>
              </p>
            </div>
            <p className="flex items-center w-full mt-4 text-xs text-gray-600">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center ">New to Amazon?</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </p>
            <Link className="w-full" to="/registration">
              <button className="w-[350px] py-1.5  mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                Create your Amazon account
              </button>
            </Link>
          </form>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-10 bg-gradient-to-t from-white via-white to-zinc-200">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default SignIn;
