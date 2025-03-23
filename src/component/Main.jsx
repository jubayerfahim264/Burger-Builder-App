import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Route, Routes, Navigate } from "react-router-dom";
import { withNavigation } from "./Orders/Checkout/withNavigation";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { authCheck } from "./Auth/authActionCreator";
import { Component } from "react";
import Logout from "./Auth/Logout";

const CheckoutWithNav = withNavigation(Checkout);

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};
class Main extends Component {
  componentDidMount() {
    this.props.authCheck();
  }
  render() {
    // যখন token null হবে তখন signup page এ রিডাইরেক্ট হবে
    if (this.props.token === null) {
      return (
        <>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/signup" element={<Auth />} />
              <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
          </div>
        </>
      );
    }

    // যদি token থাকে, তাহলে অন্যান্য routes দেখানো হবে
    return (
      <>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={<CheckoutWithNav />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
