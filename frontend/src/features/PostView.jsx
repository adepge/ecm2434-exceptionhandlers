/* a absolute view for the post */
import "./stylesheets/postView.css";

import Interactives from "../features/interactives";
import InteractivesTop from "../features/interactivesTop";

import Polaroid from "./polaroid";

function PostView({ caption, image, isActive, leaveFunction, location, userIcon }) {
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
              <Polaroid src={image} caption={caption} />
            </div>
            <Interactives location={location} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
