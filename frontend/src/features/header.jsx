import { useEffect, useState } from "react";
import logo from "../assets/logo-notext.png";
import usericon from "../assets/header/user-icon.jpg";

import user from "../assets/header/user.svg";
import settings from "../assets/header/setting.svg";
import "./stylesheets/header.css";
import { Link } from "react-router-dom";
import CheckLogin from "./CheckLogin";
import { useLocation } from "react-router-dom";
import Coin from '../assets/challenge/coin.png';
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Header() {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [userIcon, setUserIcon] = useState(usericon)
  const [showIcon, setShowIcon] = useState(false)
  const [coins, setCoins] = useState(0)

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.id !== "user-icon") {
        setShowMenu(false);
      }
    });


    const getIcon = async () => {
      let response = await CheckLogin(false);
      // if the user is not logged in, no icon will be shown
      if (response === false) {
        setShowIcon(false)
      }
      else {
        setShowIcon(true)
      }
      return response.data
    }

    getIcon().then((user) => {
      // if the user has not set a profile picture, the default one will be used
      if (user.profilePicture !== "NULL") {
        setUserIcon(user.profilePicture)
      }
      setCoins(user.coins)
    });

  }, [location.pathname]);

  const logout = async () => {
    let token = cookies.get('token')
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/logout/",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${cookies.get('token')}`,
          },
        }
      );
     
      cookies.remove('token');
      window.reload();
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log(error.response)
        alert("internal server error, please try again later")
      } else {
        alert("cannot connect to the server")
      }
    }
  }

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
          {showIcon &&
            (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div id="coin">
                  <img src={Coin} width={"15px"} height={"15px"} />
                  <div>{coins}</div>
                </div>
                <img src={userIcon} id="user-icon" width={"25px"} height={"25px"} style={{ border: "none", borderRadius: "25px" }} onClick={toggleMenu} />
              </div>
            )
          }

          <ul id="slide-menu" className={showMenu ? "show" : ""}>
            <Link to="/profile">
              <li id="menu" ><img src={user} width={"16px"} height={"16px"} style={{ marginRight: "5px" }} /><div >profile</div></li></Link>
            <Link to="/editProfile">
              <li id="menu" ><img src={settings} width={"16px"} height={"16px"} style={{ marginRight: "5px" }} /><div >settings</div></li>
            </Link>
            <li id="logout" onClick={logout}><img src={settings} width={"16px"} height={"16px"} style={{ marginRight: "5px" }} /><div >logout</div></li>
          </ul></div>
      </div>
    </header >
  );
}

export default Header;
