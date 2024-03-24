import React from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { ProductData } from "./api/Api";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={ProductData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Route>
    )
  );

  return (
    <div className="bg-gray-100 font-bodyFont">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
