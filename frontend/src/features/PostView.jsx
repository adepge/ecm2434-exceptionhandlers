import "./stylesheets/postView.css";

import Interactives from "../features/interactives";
import InteractivesTop from "../features/interactivesTop";

function PostView({
  image,
  isActive,
  leaveFunction,
  likes,
  location,
  userIcon,
  liked,
}) {
  return (
    <div>
      <div
        className={isActive ? "display active" : "display"}
        onClick={leaveFunction}
      >
        <div className="post-wrapper">
          <div className="post">
            <div style={{ height: "60px" }} />
            <InteractivesTop />
            <img src={image} alt="image" style={{ width: "100%" }} />
            <Interactives />
            <div style={{ height: "60px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
