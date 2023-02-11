import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2> Product List </h2>
        {products.map((product, index) => {
          return (
            <Card
              product={product}
              key={index}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2> This section for Checkout </h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6"> {loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
