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
            <InteractivesTop />
            <div className="image">
              <div className="date-time">2 days ago</div>
              <img src={image} alt="image" style={{ width: "100%" }} />
            </div>
            <Interactives
              liked={liked}
              location={location}
              likes={likes}
              isActive={isActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
