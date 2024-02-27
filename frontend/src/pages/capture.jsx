import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePositionStore, useGeoTagStore} from "../stores/geolocationStore";
import Send from "../assets/send.svg";
import Location from "../assets/location.svg";
import Reset from "../assets/reset.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import Geolocation from "../features/Geolocation";
import LoadingScreen from "../features/loadingScreen";

import "./stylesheets/capture.css";

const cookies = new Cookies();
axios.defaults.withCredentials = true;

function Capture() {
  // Simple mobile detection
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     // Trigger file input on mobile devices
  //     document.getElementById('fileInput').click();
  // } else {
  //     alert('Camera capture is optimized for mobile devices.');
  // }

  // the user's position
  const position = usePositionStore(state => state.position);
  const locationTag = useGeoTagStore(state => state.geoTag);

  const [lastPosition, setLastPosition] = useState({ lat: 0, lng: 0 });

  const navigate = useNavigate();
  const inputRef = useRef(null);

  // the preview image
  const [previewImg, setPreviewImg] = useState("");
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // the post data
  const [postData, setPostData] = useState({
    username: cookies.get("token"),
    caption: "",
    geolocID: 0,
  });
  console.log(cookies.get("token"));

  // when the form is changed, set the state in post data
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // return;
    // e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/geolocations/",
        {
          latitude: position.lat,
          longitude: position.lng,
          location: "University of exeter"
        }
      );
      const geolocID = response.data.id;
      const formData = new FormData();
      // Ensure 'fileInput' is the correct ID for your file input field
      const imageFile = document.getElementById("fileInput").files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        alert("No image file selected");
        setIsLoading(false);
        return; // Exit the function if no file is selected
      }

      // Append other postData fields to formData
      // formData.append("userid", 1);
      formData.append("caption", postData.caption);
      formData.append("geolocID", geolocID); // Append geolocID as a number

      try {
        // Update the API URL as per your configuration
        const response = await axios.post(
          "http://127.0.0.1:8000/api/createPost/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Token ${postData.username}`, // Assuming postData.username is the token
            },
          }
        );

        navigate("/");
      } catch (error) {
        console.error("Error occurred:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }

      alert("An error occurred while creating the post");
    }

    setIsLoading(false);
  };

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
    console.log(previewImg);

    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setFile(file); // store the file object
    }
  };

  return (
    <>

      <LoadingScreen active={isLoading} />
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
                        {locationTag}
                      </div>

                      {/* the submit button */}
                      <button
                        className="share element"
                        // type="submit"
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
