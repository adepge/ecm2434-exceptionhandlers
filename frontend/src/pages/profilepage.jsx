import "./stylesheets/profilepage.css";

import userIcon from "../assets/header/user-icon.svg";

function ProfilePage() {
  return (
    <div id="display">
      <div id="profile-wrapper">
        <div id="profile">
          <h1>Profile</h1>
          <div id="user-icon">
            <img src={userIcon} alt="user icon" width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
