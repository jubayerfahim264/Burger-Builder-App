import "./Header.css";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import Logo from "../../assets/Burger-Logo.png";
const Header = (args) => {
  return (
    <>
      <div>
        <Navbar
          {...args}
          expand="md"
          style={{ background: "#D70F64", height: "70px" }}
        >
          <NavbarBrand href="/">
            <img src={Logo} alt="Burger Logo" width="80px" />
          </NavbarBrand>

          <Nav className="me-md-5 ms-auto">
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
          </Nav>
          <NavbarText>
            <a href="#" className="nav-btn">
              Login
            </a>
          </NavbarText>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
