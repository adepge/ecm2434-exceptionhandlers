import React, { useEffect } from "react";
import logo from "../assets/logo-notext.png";
import usericon from "../assets/header/user-icon.jpg";

import user from "../assets/header/user.svg";
import settings from "../assets/header/setting.svg";
import "./stylesheets/header.css";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      console.log(e.target)
      if (e.target.id !== "user-icon") {
        setShowMenu(false);
      }
    });
  }, []);

  return (
    <header>
      <div id="header-wrapper">
        {/* the logo which is the title and the logo */}
        <div id="logo">
          <img src={logo} id="icon" alt="icon" height="30px" />
          <div id="title">Post-i-tivity</div>
        </div>

        {/* the user icon */}
        <div>
          <img src={usericon} id="user-icon" alt="user-icon" width={"25px"} height={"25px"} style={{ border: "none", borderRadius: "25px" }} onClick={toggleMenu} />

          <ul id="slide-menu" className={showMenu ? "show" : ""}>
            <Link to="/profile">
              <li id="menu" ><img src={user} width={"16px"} height={"16px"} style={{ marginRight: "5px" }} /><div >profile</div></li></Link>
            <Link to="/editProfile">
              <li id="menu" ><img src={settings} width={"16px"} height={"16px"} style={{ marginRight: "5px" }} /><div >settings</div></li>
            </Link>
          </ul></div>
      </div>
    </header >
  );
}

export default Header;
