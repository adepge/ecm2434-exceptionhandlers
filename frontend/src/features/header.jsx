import React from "react";
import icon from "../assets/icon.svg";
import "./stylesheets/header.css";

function Header() {
  return (
    <header>
      <div id="logo">
        <img src={icon} id="icon" alt="icon" />
        <div id="title">Napoleon finder</div>
      </div>
    </header>
  );
}

export default Header;
