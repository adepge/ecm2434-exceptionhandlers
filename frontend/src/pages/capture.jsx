import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePositionStore, useGeoTagStore } from "../stores/geolocationStore";
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

const cookies = new Cookies();
axios.defaults.withCredentials = true;

function Capture() {
  useEffect(() => {
    async function check() {
      const res = await CheckLogin();
      capture();
    }
    check();
  }, []);

  const navigate = useNavigate();

  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const locationTag = useGeoTagStore(state => state.geoTag);
  const setLocationTag = useGeoTagStore(state => state.setGeoTag);

  const [lastPosition, setLastPosition] = useState({ lat: 0, lng: 0 });
  const inputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [captionError, setCaptionError] = useState("");

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setPosition(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (!(lastPosition.lat && lastPosition.lng) || Math.abs(lastPosition.lat - position.lat) > 0.001 || Math.abs(lastPosition.lng - position.lng) > 0.001) {
      Geolocation(position.lat, position.lng, setLocationTag);
      setLastPosition({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption.length > 255) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/geolocations/",
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

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/createPost/",
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


  const capture = () => {
    inputRef.current.click();
  };

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <>
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
        <div id="display">
          <div id="preview-wrapper">
            <div id="preview">
              <div id="spacer">
                <div id="contents">
                  {previewImg ? (
                    // <img
                    //   src={previewImg}
                    //   alt="Preview Image"
                    //   style={{ maxWidth: "100%", height: "auto" }}
                    // />
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
