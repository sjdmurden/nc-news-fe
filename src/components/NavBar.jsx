import {Link} from "react-router-dom";
import React from "react";

function NavBar() {
  return (
    <header>
      <nav id="nav">
        <Link to="/">Home </Link>
        <Link to="/topic/coding">Coding </Link>
        <Link to="/topic/football"> Football</Link>
        <Link to="/topic/cooking"> Cooking</Link>
      </nav>
    </header>
  );
}

export default NavBar;
