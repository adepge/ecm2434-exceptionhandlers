import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePositionStore, useGeoTagStore, useLastPositionStore } from "../stores/geolocationStore";
import Send from "../assets/send.svg";
import Location from "../assets/location.svg";
import Reset from "../assets/reset.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import Geolocation from "../features/Geolocation";
import LoadingScreen from "../features/loadingScreen";
import CheckLogin from "../features/CheckLogin";
import "./stylesheets/capture.css";
import Polaroid from "../features/polaroid";

// function for set cookies
const cookies = new Cookies();

// the page
function Capture() {

  // check if the user have logged in if so capture
  useEffect(() => {
    async function check() {
      await CheckLogin();
      capture();
    }
    check();
  }, []);

  // Hook to redirect user programmatically.
  const navigate = useNavigate();

  // State management for geolocation and location tags using zustand stores.
  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const locationTag = useGeoTagStore(state => state.geoTag);
  const setLocationTag = useGeoTagStore(state => state.setGeoTag);
  const lastPosition = useLastPositionStore(state => state.position);
  const setLastPosition = useLastPositionStore(state => state.setPosition);


  // Local state management for UI interactions and data handling.
  const inputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [captionError, setCaptionError] = useState("");

  // Handle caption input changes and enforce character limit.
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 255) {
      setCaptionError("Caption cannot exceed 255 characters.");
    } else if (value.length >= 200) {
      setCaptionError(`Approaching limit (${value.length}/255)`);
    } else {
      setCaptionError("");
    }
    setCaption(value);
  };

  // On component mount, check login status and initialize capture functionality.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setPosition(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  // Update location tag based on position change with a certain threshold.
  useEffect(() => {
    if (lastPosition.lat == 0 && lastPosition.lng == 0) {
      Geolocation(position.lat, position.lng, setLocationTag);
      setLastPosition({ lat: position.lat, lng: position.lng });
    } else if (Math.abs(lastPosition.lat - position.lat) > 0.001 || Math.abs(lastPosition.lng - position.lng) > 0.001) {
      Geolocation(position.lat, position.lng, setLocationTag);
      setLastPosition({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  // Handle form submission for creating a new post.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // The caption should not be more than 255 charaters
    if (caption.length > 255) {
      return;
    }
    setIsLoading(true);

    // post the geolocation data
    try {
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/geolocations/",
        {
          latitude: position.lat,
          longitude: position.lng,
          location: locationTag,
        }
      );
      const geolocID = response.data.id;
      const formData = new FormData();
      const imageFile = document.getElementById("fileInput").files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        alert("No image file selected");
        setIsLoading(false);
        return;
      }

      formData.append("caption", caption);
      formData.append("geolocID", geolocID);

      // post the post data
      try {
        const response = await axios.post(
          "https://api.post-i-tivity.me/api/createPost/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Token ${cookies.get('token')}`,
            },
          }
        );

        navigate("/");
      } catch (error) {
        handleNetworkError(error);
      }
    } catch (error) {
      handleNetworkError(error);
    }

    setIsLoading(false);
  };

  // called when there's a network error
  const handleNetworkError = (error) => {
    console.error("Error occurred:", error);
    if (error.response) {
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received, likely a network error
      alert("Cannot access the backend. Please check your network connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("An error occurred while creating the post");
    }
  };


  // open the user's camera
  const capture = () => {
    inputRef.current.click();
  };

  // get the captured file
  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <>
    {/* the loading screen for posting */}
      <LoadingScreen active={isLoading} />
      <div id="capturePage" className="page active">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          id="fileInput"
          ref={inputRef}
          onChange={handleCapture}
          style={{ display: "none" }}
        />
        <div id="displayCapture">
          <div id="preview-wrapper">
            <div id="preview">
              <div id="spacer">
                <div id="contents">
                  {previewImg ? (
                    <Polaroid
                      src={previewImg}
                      caption={caption}
                    />
                  ) : (
                    <div
                      id="previewPlaceholder"
                      onClick={
                        () => {
                          capture();
                        }
                      }
                    >
                      <p>Tap to take a picture</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div id="form">
                      <input
                        name="caption"
                        type="caption"
                        placeholder="Post caption"
                        value={caption}
                        onChange={handleChange}
                      />
                      {captionError &&
                        <div style={{ width: "100%", textAlign: "right" }}>
                          <div style={{ color: caption.length >= 250 ? "red" : "orange" }}>{captionError}</div></div>}
                    </div>
                    <div id="previewButtons">
                      <div className="retake element">
                        <img
                          src={Reset}
                          width={"15px"}
                          height={"15px"}
                          onClick={
                            () => {
                              capture();
                            }
                          }
                        />
                      </div>
                      <div className="location element">
                        <img src={Location} />
                        {locationTag}
                      </div>
                      <button
                        className="share element"
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
        </div >
      </div >
    </>
  );
}

export default Capture;
