import React from "react";

import "./Header.scss";

function Header() {
  return (
    <header id="page-header">
      <div className="left-side">
        <h1>TOP SICK PICKS</h1>
        <img src="/flame.png" width="50rem" height="50rem"></img>
      </div>
      <div className="right-side">
        <img src="sound-bars.png" width="50rem" height="50rem" />
      </div>
    </header>
  );
}

export default Header;
