import "./stylesheets/profilepage.css";

import userIcon from "../assets/header/user-icon.jpg";
import ytIcon from "../assets/profilepage/YouTube.png";
import instaIcon from "../assets/profilepage/Instagram.png";
import twitterIcon from "../assets/profilepage/Facebook.png";
import CheckLogin from "../features/CheckLogin";

function ProfilePage() {

  async function setUserName() {
    let response = await CheckLogin()
    console.log()
  }

  setUserName()

  return (

    <div id="displayProfile">
      <div id="profile-wrapper">
        <div id="profile">
          <div id="spacer">
            <h1>Jay</h1>
            <div id="user-icon">
              <img src={userIcon} alt="user icon" width={"100%"} />
            </div>
            <div id="socials">
              <a id="youtube" className="social-icon" href="https://www.youtube.com/channel/UCFbNIlppjAuEX4v1zgC7LzQ">
                <img src={ytIcon} alt="YouTube" width={"17px"} height={"17px"} />
                youtube
              </a>
              <a href="https://www.instagram.com/" id="instagram" className="social-icon">
                <img src={instaIcon} alt="YouTube" width={"17px"} height={"17px"} />
                instagram
              </a>
              <a id="twitter" className="social-icon" >
                <img src={twitterIcon} alt="YouTube" width={"17px"} height={"17px"} />
                twitter
              </a>
            </div>
            <div id="bio">
              The only one that can truely understand you is
              yourself, so why not be yourself and let the world
              see who you really are.
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProfilePage;
