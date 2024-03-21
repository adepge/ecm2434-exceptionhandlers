import { useState, useEffect, useMemo, useRef } from "react";
import { usePositionStore } from "../stores/geolocationStore";
import { usePinStore, useCollectedPinStore } from "../stores/pinStore";
import { useNavigate } from "react-router-dom";
import "./stylesheets/map.css";
import DrawerDown from "../features/DrawerDown";
import axios from "axios";
import InitMap from "../features/InitMap";
import Geolocation from "../features/Geolocation";
import Cookies from "universal-cookie";
import PostView from "../features/PostView";
import CheckLogin from "../features/CheckLogin";
import question from "../assets/map/question.svg";
import pinimg from "../assets/map/pin.svg";
import Map, { Marker } from 'react-map-gl';
import PositionPrompt from "../features/PositionPrompt";

const cookies = new Cookies();

// Debugging options
const seeAllPins = false;

// get all the post from database 
const getPosts = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/getRecentPosts/"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get collected posts from the database
const getCollectedPosts = async (token) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/collectedPosts/",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

function MapPage() {

  const navigate = useNavigate();

  // check if the user is logged in
  useEffect(() => {
    CheckLogin(true, navigate)
  }, []);

  // State for active post in the view
  const [activePost, setActive] = useState({});

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);

  // State for drawer
  const [drawerTopVisible, setDrawerTopVisible] = useState(false);
  const [drawerPost, setDrawerPost] = useState(null);

  // State for form data ( adding posts to collection )
  const [form, setForm] = useState({ "postid": 0 })

  // Global state for current position, location tag and pins
  const [locationGranted, setLocationGranted] = useState(true);
  const [heading, setHeading] = useState(null);
  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const pins = usePinStore(state => state.pins);
  const setPins = usePinStore(state => state.setPins);
  const [heading, setHeading] = useState(null);
  const [locationGranted, setLocationGranted] = useState(true);

  // Global state for collected pins
  const collectedPins = useCollectedPinStore(state => state.pinIds);
  const addCollectedPin = useCollectedPinStore(state => state.addPinId);

  // User agent flag
  const [awaitUserPrompt, setAwaitUserPrompt] = useState("loading");

  // User agent functions to check for location
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  const token = cookies.get('token');

  // User agent functions to check for location
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Set loading timeout (to match fade animation duration)
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setLoading(false);
      }, 2550);
    }
  }, [progress]);

  // Reference to awaitUserPrompt state to be used in the promise chain (to avoid stale closure)
  const awaitUserPromptRef = useRef(awaitUserPrompt);

  useEffect(() => {
    awaitUserPromptRef.current = awaitUserPrompt;
  }, [awaitUserPrompt]);

  useEffect(() => {
    // Check if the user has location services enabled
    new Promise((resolve, reject) => {
      if (isIOS()) {
        // Handles iOS devices (permissions query not supported)
        setLocationGranted(false);
        setAwaitUserPrompt("prompted");
        setProgress(oldProgress => oldProgress + 20);
      } else {
        if (navigator.permissions) {
          // Check the location permission status
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
              setLocationGranted(true);
              setAwaitUserPrompt("resolved");
              setProgress(oldProgress => oldProgress + 20);
            } else {
              setLocationGranted(false);
              setAwaitUserPrompt("prompted");
              setProgress(oldProgress => oldProgress + 20);
            }
          });
        }
      }
      resolve();
    })
    .then(() => {
      return new Promise((resolve) => {
        // Check if the user has location services enabled (awaitUserPrompt is only set to "resolved" if the user has granted permission)
        const intervalId = setInterval(() => {
          if (awaitUserPromptRef.current === "resolved") {
            if (navigator.geolocation) {
              navigator.geolocation.watchPosition(
                (position) => {
                  setLocationGranted(true);
                  setPosition(position.coords.latitude, position.coords.longitude);
                  setHeading(position.coords.heading);
                  resolve();
                  clearInterval(intervalId);
                },
                (error) => {
                  if (error.code === error.PERMISSION_DENIED) {
                    setLocationGranted(false);
                    setAwaitUserPrompt("prompted"); // Prompt the user again
                  } else {
                    console.error(error);
                    resolve();
                    clearInterval(intervalId);
                  }
                }
              );
            } else {
              console.log("Geolocation is not supported by this browser.")
              resolve();
              clearInterval(intervalId);
            }
          }
        }, 1000); // Check every second for awaitUserPrompt to become resolved
      });
    })
    .then(() => {
      setProgress(oldProgress => oldProgress + 30);
    })
      .then(() => {
        // Get the posts from the database
        const token = cookies.get('token');
        getCollectedPosts(token).then((data) => data.map((post) => addCollectedPin(post.id)));
        getPosts().then((data) => {
          setPins(data);
          setProgress(oldProgress => oldProgress + 30);
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the API URL as per your configuration
      const response = await axios.post(
        "http://127.0.0.1:8000/api/collectPost/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`, // Assuming postData.username is the token
          },
        }
      );
      addCollectedPin(form.postid);
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  // Filter pins based on radial distance calculated using the Haversine formula
  const filterPins = (lat, lng) => {
    const radius = 0.05; // Minimum radius of discovery (about 50m from the position)

    const closePins = pins.filter((pin) => {
      const dLat = deg2rad(pin.position.lat - lat);
      const dLng = deg2rad(pin.position.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(pin.position.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = c * 6371.1; // Distance of the Earth's radius (km)

      return distance < radius || collectedPins.includes(pin.id);
    });
    return seeAllPins ? pins : closePins;
  }

  const discoverPins = (lat, lng) => {
    const minRadius = 0.05; // Minimum radius of discovery (about 50m from the position)
    const maxRadius = 0.25; // Decided to not use max radius for now

    const discoverPins = pins.filter((pin) => {

      const dLat = deg2rad(pin.position.lat - lat);
      const dLng = deg2rad(pin.position.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(pin.position.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = c * 6371.1; // Distance of the Earth's radius (km)

      return distance > minRadius && !collectedPins.includes(pin.id);
    });
    return discoverPins;
  }


  // Converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  // Handle the opening of the drawer and sets active post
  const handleOpen = (id) => {
    setPins(
      pins.map((pin) => {
        if (pin.id === id) {
          setForm({ "postid": id })
          setDrawerTopVisible(true);
          setDrawerPost(pin);
          return { ...pin, open: !pin.open };
        } else {
          return { ...pin, open: false };
        }
      })
    );
  };

  // Render the pins within close proximity of the user
  const closeRenderPins = useMemo(() => {
    return filterPins(position.lat, position.lng).map((pin) => {
      return (
        <Marker
          key={pin.id}
          longitude={pin.position.lng}
          latitude={pin.position.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            handleOpen(pin.id);
          }}
        >
          <img src={pinimg} />
        </Marker>
      );
    });
  }, [position.lat, position.lng, filterPins]);

  // Renders undiscovered pins outside the close proximity of the user
  const questionRenderPins = useMemo(() => {
    return discoverPins(position.lat, position.lng).map((pin) => {
      return (
        <Marker
          key={pin.id}
          longitude={pin.position.lng}
          latitude={pin.position.lat}
          anchor="bottom"
        >
          <img src={question} />
        </Marker>
      );
    });
  }, [position.lat, position.lng, discoverPins]);

  // Memoized map component (caches the map component to prevent re-rendering on state changes)
  const memoizedMap = useMemo(() => {
    return (
      <Map
        id="map"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_API_KEY}
        initialViewState={{
          longitude: position.lng,
          latitude: position.lat,
          zoom: 17
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={position.lng} latitude={position.lat} anchor="center">
          <div
            style={{
              width: 14,
              height: 14,
              position: "absolute",
              top: 0,
              left: 0,
              background: "#4185f5",
              border: "2px solid #ffffff",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          {heading !== null && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid #4185f5",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                transform: `rotate(${heading}deg)`,
              }}
            ></div>
          )}
        </Marker>
        {closeRenderPins}
        {questionRenderPins}
      </Map>
    )
  });

  return (
    <>
      {awaitUserPrompt == "prompted" && <PositionPrompt setLocationGranted={setLocationGranted} setProgress={setProgress} setAwaitUserPrompt={setAwaitUserPrompt} />}
      {/* the absolute position post view */}
      <PostView
        isActive={Object.keys(activePost).length !== 0}
        image={activePost['image']}
        leaveFunction={() => {
          setActive({});
        }}
        caption={activePost["caption"]}
        // perform a null check or ensure that activePost["position"]["location"] exists before accessing its location property.
        location={activePost["position"] && activePost["position"]["location"]}
      />
      <div id="map-content">
        {loading && <InitMap progress={progress} />}
        <DrawerDown
          id={form.postid}
          image={drawerPost?.image}
          caption={drawerPost?.caption}
          drawerVisible={drawerTopVisible}
          setDrawerVisible={setDrawerTopVisible}
          handleSubmit={handleSubmit}
          handleClickPolaroid={() => setActive(pins.find((pin) => pin.id === form.postid))}
        />
        {!loading && (position.lat && position.lng) &&
          <div className="mapContainer">
            {memoizedMap}
          </div>}
      </div>
    </>
  );
}

export default MapPage;