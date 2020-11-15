import React from "react";

import "./Header.scss";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="page-header">
      <Link to="/">
        <div className="left-side">
          <h1>TOP SICK PICKS</h1>
          <img src="/flame.png" width="50rem" height="50rem"></img>
        </div>
      </Link>
      <div className="right-side">
        <img src="sound-bars.png" width="50rem" height="50rem" />
      </div>
    </header>
  );
}

export default Header;
