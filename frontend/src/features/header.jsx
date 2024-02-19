import React from "react";
import icon from "../assets/header/icon.svg";
import usericon from "../assets/header/user-icon.svg";
import "./stylesheets/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div id="header-wrapper">
        <div id="logo">
          <img src={icon} id="icon" alt="icon" />
          <div id="title">CatNav</div>
        </div>
        <img src={usericon} id="user-icon" alt="user-icon" />
      </div>
    </header>
  );
}

export default Header;
