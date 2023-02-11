import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userInfo = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header"> User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2"> Name:</span> {name}
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2"> Email:</span> {email}
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-danger"> User Area </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="User Dashboard"
      description="View Your Info"
      className="container  p-4"
    >
      <div className="row textcenter">
        <div className="col-3"></div>
        <div className="col-6">{userInfo()}</div>
        <div className="col-3"></div>
      </div>
    </Base>
  );
};

export default UserDashboard;
