import { useEffect, useRef, useState } from "react";
import "./stylesheets/capture.css";

import Send from "../assets/send.svg";
import Location from "../assets/location.svg";
import Reset from "../assets/reset.svg";
import axios from "axios";

function Capture() {
  // Simple mobile detection
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     // Trigger file input on mobile devices
  //     document.getElementById('fileInput').click();
  // } else {
  //     alert('Camera capture is optimized for mobile devices.');
  // }

  // the preview image
  const [previewImg, setPreviewImg] = useState("");

  // the post data
  const [postData, setPostData] = useState({
    fileName: "file.jpg",
    username: "nathan",
    caption: "",
    geolocID: 0,
  });

  // the geolocation data
  const [geolocData, setGeolocData] = useState({
    location: "1",
    latitude: 0.0,
    longitude: 0.0,
  });

  // when the form is changed, set the state in post data
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // on submit
  const handleSubmit = async (e) => {
    console.log(geolocData);
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/geolocations/",
        geolocData
      );
      const geolocID = response.data.id;
      setPostData({ ...postData, geolocID: geolocID });
      console.log(postData);
      // Handle success (e.g., show message, redirect)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

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

  // handle the capture
  const handleCapture = (e) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div id="capturePage" class="page active">
        {/* the invisible file input element */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          id="fileInput"
          ref={inputRef}
          onChange={handleCapture}
          style={{ display: "none" }}
        />
        <div id="display">
          <div id="preview-wrapper">
            <div id="preview">
              <div id="spacer">
                <div id="contents">
                  {/* the preview image */}
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

                  {/* the form 70px margin for the footer*/}
                  <form onSubmit={handleSubmit}>
                    {/* the caption */}
                    <div id="form">
                      <input
                        name="caption"
                        type="caption"
                        placeholder="post"
                        onChange={handleChange}
                      />
                    </div>

                    {/* the buttons on the bottom */}
                    <div id="previewButtons">
                      {/* the retake button */}
                      <div className="retake element">
                        <img
                          src={Reset}
                          width={"15px"}
                          height={"15px"}
                          onClick={() => {
                            capture();
                          }}
                        />
                      </div>

                      {/* the location button */}
                      <div className="location element">
                        <img src={Location} />
                        Forum
                      </div>

                      {/* the submit button */}
                      <button
                        className="share element"
                        type="submit"
                        style={{ height: "100%" }}
                      >
                        <img src={Send} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Capture;
