/* a polaroid component that takes in a src and a function to be called when clicked. It also takes in a rotation value to rotate the polaroid. */

import "./stylesheets/polaroid.css";

function Polaroid({ src, func, rotation, caption, shadow = true }) {
  return (
    <div
      className={shadow ? "polaroid shadow" : "polaroid"}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={func}
    >
      <div className="padding">
        <img src={src} alt="polaroid" style={{ width: "100%" }} />
        <div className="caption">
          {caption}
        </div>
      </div>
    </div>
  );
}

export default Polaroid;
