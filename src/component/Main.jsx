import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import { withNavigation } from "./Orders/Checkout/withNavigation";

const CheckoutWithNav = withNavigation(Checkout);

const Main = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/checkout" element={<CheckoutWithNav />} />{" "}
        </Routes>
      </div>
    </>
  );
};

export default Main;
