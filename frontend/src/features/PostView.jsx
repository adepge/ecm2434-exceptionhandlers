/* a absolute view for the post */
import "./stylesheets/postView.css";

import Interactives from "../features/interactives";
import InteractivesTop from "../features/interactivesTop";

import Polaroid from "./polaroid";

function PostView({ caption, image, isActive, leaveFunction, location, userIcon, showBottomBar = true }) {
  return (
    <div>
      <div
        className={isActive ? "display active" : "display"}
        onClick={leaveFunction}
      >
        <div className="post-wrapper">
          <div className="post">
            <div className="spacer">
              <InteractivesTop />
              <div className="image">
                <Polaroid src={image} caption={caption} />
              </div>
              {showBottomBar && (
                <Interactives location={location} isActive={isActive} />
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
