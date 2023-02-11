import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const makePayment = (token) => {
    console.log("HERE");
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        // we call call further method for ex: createOrder

        const { status } = response;
        // const orderData = {
        //   products: products,
        //   transaction_id: response.transaction.id, // check ones
        //   amount: response.transaction.amount,
        // };
        // createOrder(userId, token, orderData);
        // console.log("STATUS:", status);
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });

        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Strip</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning"> Signin </button>
      </Link>
    );
  };

  return (
    <div>
      <h3> Stripe Checkout {getFinalPrice()} </h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
