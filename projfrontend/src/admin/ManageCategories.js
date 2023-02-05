import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  updateCategories,
  getCategories,
  deleteCategory,
} from "./helper/adminapicall";

const ManageCategories = () => {
  const [names, setName] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setName(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success md-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {names.length} Categories
          </h2>
          {names.map((name, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{name.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${name._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(name._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      title=" Update a Category Here "
      description="Manage categories for tshirts"
      className="container bg-info p-4"
    >
      {myCategoryForm()}
      {goBack()}
    </Base>
  );
};

export default ManageCategories;
