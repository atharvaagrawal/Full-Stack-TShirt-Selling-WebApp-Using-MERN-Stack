import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts";
import Orders from "./admin/Orders";
import ManageCategories from "./admin/ManageCategories";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategories";
import Cart from "./core/Cart";
import Category from "./core/Category";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/category" element={<Category />}></Route>

        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create/category"
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <ManageCategories />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create/product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/product/update/:productId"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/category/update/:categoryId"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AllRoutes;
