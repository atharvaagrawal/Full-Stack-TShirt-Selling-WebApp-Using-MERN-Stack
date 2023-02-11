import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = function (f) {
    return f;
  },
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Coding Atharva";
  const cardDescrption = product ? product.description : "Coding Atharva";
  const cardPrice = product ? product.price : "100";
  const cardCategory = product ? product.category.name : "T-Shirt";

  const navigate = useNavigate();
  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return navigate("/cart");
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveToCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cardTitle}</div>

      <a href="#!">
        <div className="mask">
          <div className="d-flex justify-content-start align-items-end h-100">
            <h5>
              <span className="badge bg-success ms-2">{cardCategory}</span>
            </h5>
          </div>
        </div>
        <div className="hover-overlay">
          <div className="mask"></div>
        </div>
      </a>
      <div className="card-body">
        <ImageHelper product={product} />

        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescrption}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveToCart(removeFromCart)}</div>
        </div>
        {getARedirect(redirect)}
      </div>
    </div>
  );
};

export default Card;
