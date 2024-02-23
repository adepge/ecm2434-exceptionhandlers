import { useEffect, useRef, useState } from "react";
import "./stylesheets/capture.css";

import Send from "../assets/send.svg";
import Location from "../assets/location.svg";
import Reset from "../assets/reset.svg";

function Capture() {
  // Simple mobile detection
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     // Trigger file input on mobile devices
  //     document.getElementById('fileInput').click();
  // } else {
  //     alert('Camera capture is optimized for mobile devices.');
  // }

  const [previewImg, setPreviewImg] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    // Check if the input element exists and then click it programmatically
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []); // Empty dependency array means this runs once after the initial render

  const capture = () => {
    // Trigger file input
    inputRef.current.click();
  };

  const handleCapture = (e) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div id="capturePage" class="page active">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          id="fileInput"
          ref={inputRef}
          onChange={handleCapture}
          style={{ display: "none" }}
        />
      </div>
      <div id="preview-wrapper">
        <div id="preview">
          <div id="contents">
            {previewImg ? (
              <img
                src={previewImg}
                alt="Preview Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <div
                id="previewPlaceholder"
                onClick={() => {
                  capture();
                }}
              >
                <p>Tap to take a picture</p>
              </div>
            )}
            <div id="form">
              <input className="text" type="text" placeholder="Username" />
            </div>

            <div id="previewButtons">
              <div className="share element">
                <img
                  src={Reset}
                  width={"15px"}
                  height={"15px"}
                  onClick={() => {
                    capture();
                  }}
                />
              </div>
              <div className="location element">
                <img src={Location} />
                Forum
              </div>
              <div className="share element">
                <img src={Send} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Capture;
