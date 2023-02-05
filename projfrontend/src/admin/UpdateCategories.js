import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  updateCategories,
  getCategories,
  deleteCategory,
  getCategory,
} from "./helper/adminapicall";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  let { categoryId } = useParams();
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(categoryId);
  }, []);

  const successMessage = () => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 2000);
      return <h4 className="text-success">Update Category Successfully!</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning"> Failed to Update Category! </h4>;
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // backend req fired
    updateCategories(categoryId, user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName("");
        setSuccess(true);
      }
    });
  };

  const updateProductForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            onChange={handleChange}
            className="form-control my-3"
            value={name}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update Product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Update Categories"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
