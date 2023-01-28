import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact component={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AllRoutes;
