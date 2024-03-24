import React, { useState } from "react";
import { DarkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  //Error Message  Handling//
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  //loading State //
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  //handle Function//
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  //Email validation//
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]? \w+)*@\w+([ - ]? \w+)*(\.\w{2,3})+$/);
  };

  //Handle sumbit function//
  const handleRegister = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter Valid Email");
      }
    }

    if (!password) {
      setErrPassword("Enter a Password");
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password");
    } else {
      if (cPassword !== password) {
        setErrCPassword("password  not matched");
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password >= 6 &&
      cPassword &&
      password === cPassword
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: "https://i.stack.imgur.com/lCkDg.png?s=128&g",
          });
          // Signed up
          const user = userCredential.user;
          setLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, Try another one");
          }
          // ..
        });
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setFirebaseErr("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full pb-10 bg-gray-100">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <Link to="/">
            <img className="w-32 mt-3" src={DarkLogo} alt="DarkLogo" />
          </Link>
          <div className="w-full p-6 border border-zinc-200">
            <h2 className="mb-4 text-3xl font-medium font-titleFont">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your Name</p>
                <input
                  onChange={handleName}
                  className="w-full px-2 py-1 text-base border rounded-sm outline-none border-zinc-400 focus-within:border-[#e7760] focus-within:shadow-amazonInput duration-100"
                  type="text"
                  value={clientName}
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="text-base italic font-extrabold font-titleFont">
                      !
                    </span>{" "}
                    {errClientName}
                  </p>
                )}
              </div>

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
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="text-base italic font-extrabold font-titleFont">
                      !
                    </span>{" "}
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">password</p>
                <input
                  onChange={handlePassword}
                  className="w-full px-2 py-1 text-base  border rounded-sm outline-none border-zinc-400 focus-within:border-[#e7760] focus-within:shadow-amazonInput duration-100"
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
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter password</p>
                <input
                  onChange={handleCPassword}
                  className="w-full px-2 py-1 text-base border rounded-sm outline-none border-zinc-400 focus-within:border-[#e7760] focus-within:shadow-amazonInput duration-100"
                  type="password"
                  value={cPassword}
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="text-base italic font-extrabold font-titleFont">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be at least 6 characters.
                </p>
              </div>
              <button
                onClick={handleRegister}
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
              {successMsg && (
                <div>
                  <motion.p
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs leading-4 text-black">
              By Continuing, you agree to Amazon's {""}
              <span className="text-blue-600">
                Conditions of Use{""}
              </span> and <span className="text-blue-600">Privace Notice</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account? {""}
                <Link to="/signin">
                  <span className="text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1">
                    Sign In
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="-mt-2 text-xs text-black">
                Buying for work?{" "}
                <span className="text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1">
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
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
export default Registration;
