import React from "react";
import logo from "../assets/logo-notext.png";
import usericon from "../assets/header/user-icon.jpg";
import "./stylesheets/header.css";

function Header() {
  return (
    <header>
      <div id="header-wrapper">
        {/* the logo which is the title and the logo */}
        <div id="logo">
          <img src={logo} id="icon" alt="icon" height="30px" />
          <div id="title">Post-i-tivity</div>
        </div>

        {/* the user icon */}
        <img src={usericon} id="user-icon" alt="user-icon" width={"25px"} height={"25px"} style={{ border: "none", borderRadius: "25px" }} />
      </div>
    </header>
  );
}

export default Header;
