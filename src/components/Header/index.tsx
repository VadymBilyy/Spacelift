import React from "react";
import { Link } from "react-router-dom";

import Banner from "./banner.png";

import "./styles.css";

const Header = () => {
  return (
    <div>
      <img src={Banner} alt="Logo" className="header__img" />
      <div className="header__nav">
        <Link className="header__link" to="/">
          Home
        </Link>
        <Link className="header__link" to="/docs">
          Docs
        </Link>
      </div>
    </div>
  );
};

export default Header;
