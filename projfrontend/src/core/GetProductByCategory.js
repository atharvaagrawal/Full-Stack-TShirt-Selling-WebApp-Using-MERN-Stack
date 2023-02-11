import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getProductByCategory } from "./helper/categoryHelper";

const GetProductByCate = ({ categoryName }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductByCategory(categoryName)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [categoryName]);

  console.log(products);

  return (
    <div className="row">
      {products.map((product, index) => {
        console.log(product);
        return (
          <div key={index} className="col-4 mb-4">
            <Card product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default GetProductByCate;
