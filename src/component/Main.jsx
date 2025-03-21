import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import { withNavigation } from "./Orders/Checkout/withNavigation";
import Auth from "./Auth/Auth";

const CheckoutWithNav = withNavigation(Checkout);

const Main = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/checkout" element={<CheckoutWithNav />} />
          <Route path="/signup" element={<Auth />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
