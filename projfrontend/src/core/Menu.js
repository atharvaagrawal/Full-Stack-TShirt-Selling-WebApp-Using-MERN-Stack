import React, { Fragment } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const Menu = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "#2ecc72",
    backgroundColor: "#343a40",
  };
  const navigate = useNavigate();
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
            to="/category"
          >
            Category
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
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </NavLink>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
