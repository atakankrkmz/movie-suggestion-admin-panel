import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="container">
      <div className="navbar navbar-expand-lg navbar-light bg-warning">
        <Link to="/" className="nav-brand">
          Movie Suggestion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/movie/create" className="nav-link">
                Add Movie
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/director" className="nav-link">
                Directors
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/director/create" className="nav-link">
                Add Director
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item mt-2 ml-4">
              <div className="dropdown">
                <span style={{ color: "darkslategray" }}>Support Content</span>
                <i className="fas fa-sort-down ml-2"></i>
                <div className="dropdown-content">
                  <Link to="/language/add" className="dropdown-item">
                    Add a language
                  </Link>
                  <Link to="/genre/add" className="dropdown-item">
                    Add a genre
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
