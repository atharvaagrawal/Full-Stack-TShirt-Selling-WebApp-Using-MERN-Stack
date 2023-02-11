import React from "react";
import "../styles.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">T-Shirt</span> Selling
          Website!
        </span>
      </div>
    </footer>
  );
};

export default Footer;
