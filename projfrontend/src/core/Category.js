import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories } from "./helper/categoryHelper";
import GetProductByCate from "./GetProductByCategory";

const Category = () => {
  const [names, setName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const getAllCategories = () => {
    return (
      <div>
        <h2 className="text-center text-white my-3">
          Total {names.length} Categories
        </h2>
        {names.map((name, index) => {
          return (
            <div key={index} className="btn-group display-6">
              <button
                className="nav-link btn btn-success m-5"
                onClick={() => setSelectedCategory(name.name)}
              >
                {name.name}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Categories" description="Product By Categories">
      <div className="row text-center">{getAllCategories()}</div>
      {selectedCategory && <GetProductByCate categoryName={selectedCategory} />}
    </Base>
  );
};

export default Category;
