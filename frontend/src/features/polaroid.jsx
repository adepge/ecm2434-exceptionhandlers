/* a polaroid component that takes in a src and a function to be called when clicked. It also takes in a rotation value to rotate the polaroid. */

import "./stylesheets/polaroid.css";

import { useState } from "react";

function Polaroid({ src, func, rotation, caption, shadow = true }) {

  const [loadingImage, setLoadingImage] = useState(true)
  const img = new Image()
  img.src = src
  img.onload = () => {
    setLoadingImage(false)
  }
  return (
    <div
      className={shadow ? "polaroid shadow" : "polaroid"}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={func}
    >
      <div className="padding">
        {loadingImage ? <div className="image skeleton" style={{ aspectRatio: 4 / 5 }}></div>
          :

          <img src={src} alt="polaroid" style={{ width: "100%" }} />}

        <div className="caption">
          {caption}&nbsp;
        </div>
      </div>
    </div>
  );
}

export default Polaroid;
