import "./Header.css";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

import Logo from "../../assets/Burger-Logo.png";
const Header = (props) => {
  let links = null;
  if (props.token === null) {
    links = (
      <NavItem>
        <NavLink to="/signup" className="NavLink">
          Sign up
        </NavLink>
      </NavItem>
    );
  } else {
    links = (
      <>
        <NavItem>
          <NavLink to="/" className="NavLink">
            🍔 BurgerBuilder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/order" className="NavLink">
            📦 Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" className="NavLink">
            Log out
          </NavLink>
        </NavItem>
      </>
    );
  }
  return (
    <>
      <div>
        <Navbar expand="md" style={{ background: "#D70F64", height: "70px" }}>
          <NavbarBrand href="/">
            <img src={Logo} alt="Burger Logo" width="80px" />
          </NavbarBrand>

          <Nav className="me-md-5 ms-auto">{links}</Nav>
        </Navbar>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Header);
