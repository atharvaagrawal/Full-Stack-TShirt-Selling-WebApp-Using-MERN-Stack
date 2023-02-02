import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./core/Base";
import Home from "./core/Home";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/base" element={<Base />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AllRoutes;
