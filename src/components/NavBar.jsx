import { Link } from "react-router-dom";
import React from "react";

function NavBar() {
  return (
    <header>
      <nav id="nav">
        <Link to="/articles?sort_by=created_at&order_by=DESC">Home </Link>
        <Link to="/articles/topic/coding?sort_by=created_at&order_by=DESC">
          Coding{" "}
        </Link>
        <Link to="/articles/topic/football?sort_by=created_at&order_by=DESC">
          {" "}
          Football
        </Link>
        <Link to="/articles/topic/cooking?sort_by=created_at&order_by=DESC">
          {" "}
          Cooking
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
