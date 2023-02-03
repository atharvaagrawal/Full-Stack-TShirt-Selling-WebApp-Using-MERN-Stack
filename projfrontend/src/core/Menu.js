import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "#2ecc72",
    backgroundColor: "#343a40",
  };

  let notActive = {
    color: "#fff",
  };
  return (
    <div>
      <ul className="nav nav-tabs ">
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/cart"
          >
            Cart
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/signup"
          >
            Signup
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/signin"
          >
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : notActive)}
            className="nav-link"
            to="/signout"
          >
            Signout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
