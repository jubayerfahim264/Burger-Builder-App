import { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./authActionCreator";

const mapDispacthToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to={"/"} />;
  }
}
export default connect(null, mapDispacthToProps)(Logout);
