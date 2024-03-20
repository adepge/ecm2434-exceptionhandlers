import "./stylesheets/profilepage.css";

import userIcon from "../assets/header/user-icon.jpg";
import ytIcon from "../assets/profilepage/YouTube.svg";
import instaIcon from "../assets/profilepage/Instagram.svg";
import twitterIcon from "../assets/profilepage/twitter.svg";
import CheckLogin from "../features/CheckLogin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  async function setUserName() {
    let response = await CheckLogin(true, navigate);
    setUser(response.data)
  }
  useEffect(() => {
    setUserName();
  }, []);

  console.log(user)

  return (

    <div id="displayProfile">
      <div id="profile-wrapper">
        <div id="profile">
          <div id="spacer">
            <div id="title">{user.username}</div>
            <div id="user-icon">
              <img src={user.profilePicture === "NULL" ? userIcon : user.profilePicture} alt="user icon" width={"100%"} />
            </div>
            <div id="bio">
              {user.Bio}
              <hr></hr>
            </div>
            <div id="socials">
              <a id="youtube" className="social-icon" href={user.youtube}>
                <img src={ytIcon} alt="YouTube" width={"17px"} height={"17px"} />
                Youtube
              </a>
              <a href={user.instagram} id="instagram" className="social-icon">
                <img src={instaIcon} alt="YouTube" width={"17px"} height={"17px"} />
                Instagram
              </a>
              <a id="twitter" className="social-icon" href={user.twitter}>
                <img src={twitterIcon} alt="YouTube" width={"17px"} height={"17px"} />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProfilePage;
