import React from "react";
import icon from "../assets/header/icon.svg";
import usericon from "../assets/header/user-icon.svg";
import "./stylesheets/header.css";

function Header() {
  return (
    <header>
      <div id="logo">
        <img src={icon} id="icon" alt="icon" />
        <div id="title">Napoleon finder</div>
      </div>
      <img src={usericon} id="user-icon" alt="user-icon" />
    </header>
  );
}

export default Header;
