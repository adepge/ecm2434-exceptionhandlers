import { useState, useEffect, useRef, useMemo } from "react";
import { differenceInDays, format, set } from "date-fns";
import { PathLayer } from "@deck.gl/layers";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { usePositionStore, useGeoTagStore } from "../stores/geolocationStore";
import { usePinStore, useCollectedPinStore } from "../stores/pinStore";
import "./stylesheets/map.css";
import MoodPrompt from "../features/MoodPrompt";
import DrawerDown from "../features/DrawerDown";
import Location from "../assets/location.svg";
import axios from "axios";
import InitMap from "../features/InitMap";
import Geolocation from "../features/Geolocation";
import Cookies from "universal-cookie";
import PostView from "../features/PostView";
import CheckLogin from "../features/CheckLogin";
import question from "../assets/map/question.svg";
import pinimg from "../assets/map/pin.svg";
import Map, {Marker} from 'react-map-gl';

const cookies = new Cookies();

// Debugging options
const seeAllPins = true;
const spoofLocation = false;

// get all the post from database 
const getPosts = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/getRecentPosts/"
    );
    console.log(response.data);
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

  useEffect(() => {
    CheckLogin();
  }, []);

  // State for active post in the view
  const [activePost, setActive] = useState({});

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);

  // State for mood prompt
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [mood, setMood] = useState("unselected");

  // State for drawer
  const [drawerTopVisible, setDrawerTopVisible] = useState(false);
  const [drawerPost, setDrawerPost] = useState(null);

  // State for walking and tracking path coordinates and map position
  const [path, setPath] = useState([]);
  const [walking, setWalking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [lastPosition, setLastPosition] = useState({ lat: undefined, lng: undefined });

  // State for form data ( adding posts to collection )
  const [form, setForm] = useState({ "postid": 0 })

  // Global state for current position, location tag and pins
  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const locationTag = useGeoTagStore(state => state.geoTag);
  const setLocationTag = useGeoTagStore(state => state.setGeoTag);
  const pins = usePinStore(state => state.pins);
  const setPins = usePinStore(state => state.setPins);
  const [heading, setHeading] = useState(null);

  // Global state for collected pins
  const collectedPins = useCollectedPinStore(state => state.pinIds);
  const setCollectedPins = useCollectedPinStore(state => state.setPinIds);
  const addCollectedPin = useCollectedPinStore(state => state.addPinId);

  const token = cookies.get('token');

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setLoading(false);
      }, 2550);
    }
  }, [progress]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      // Get the user's current position
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          setPosition(position.coords.latitude, position.coords.longitude);
          setHeading(position.coords.heading);
        });
      }
      setProgress(oldProgress => oldProgress + 30);
      resolve();
    })
      .then(() => {
        setProgress(oldProgress => oldProgress + 30);
      })
      .then(() => {
        cookies.get('token');
        getCollectedPosts(token).then((data) => data.map((post) => addCollectedPin(post.id)));
        getPosts().then((data) => {
          setPins(data);
          setProgress(oldProgress => oldProgress + 20);
        });
      });
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation && walking) {
  //     const watchId = navigator.geolocation.watchPosition((position) => {
  //       setPosition(position.coords.latitude, position.coords.longitude);
  //       setPath((currentPath) => [...currentPath, [position.coords.longitude, position.coords.latitude]]);
  //       setWatchId(watchId);
  //     });
  //   } else if (!walking) {
  //     navigator.geolocation.clearWatch(watchId);
  //   }
  // }, [walking]);

  useEffect(() => {
    if (!(lastPosition.lat && lastPosition.lng) || Math.abs(lastPosition.lat - position.lat) > 0.001 || Math.abs(lastPosition.lng - position.lng) > 0.001) {
      Geolocation(position.lat, position.lng, setLocationTag);
      setLastPosition({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

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
    const radius = 0.0005; // Radius of tolerance (about 35m from the position)

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

      return distance < radius;
    });
    return seeAllPins ? pins : closePins;
  }

  const discoverPins = (lat, lng) => {
    const minRadius = 0.0005; // Minimum radius of discovery (about 35m from the position)
    const maxRadius = 0.0025; // Maximum radius of discovery (about 175m from the position)

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

      return distance > minRadius && distance < maxRadius;
    });
    return discoverPins;
  }


  // Converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

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

  const closeRenderPins = useMemo(() => {
    return filterPins(position.lat, position.lng).map((pin) => {
      return (
        <Marker
          key={pin.id}
          longitude={pin.position.lng}
          latitude={pin.position.lat}
          color="red"
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

  return (
    <>
      {/* the absolute position post view */}
      <PostView
        isActive={Object.keys(activePost).length !== 0}
        image={"http://127.0.0.1:8000/" + activePost['image']}
        leaveFunction={() => {
          setActive({});
        }}
        caption={activePost["caption"]}
        // perform a null check or ensure that activePost["position"]["location"] exists before accessing its location property.
        location={activePost["position"] && activePost["position"]["location"]}
      />
      <div className={Object.keys(activePost).length !== 0 ? "blur" : ""} id="map-content">
        {loading && <InitMap progress={progress} />}
        <DrawerDown
          id={form.postid}
          image={"http://127.0.0.1:8000/" + drawerPost?.image}
          caption={drawerPost?.caption}
          drawerVisible={drawerTopVisible}
          setDrawerVisible={setDrawerTopVisible}
          handleSubmit={handleSubmit}
          handleClickPolaroid={() => setActive(pins.find((pin) => pin.id === form.postid))}
        />
        {(position.lat && position.lng) && 
          <div className= "mapContainer">
            <Map
              id = "map"
              mapboxAccessToken="pk.eyJ1IjoiYWRlcGdlIiwiYSI6ImNsdHo2dW1ycDBsODUyaXFtenlzbmlyZHYifQ.BOt1O2WxbF8jnEgZcIj1aQ"
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
          </div>}
      </div>
    </>
  );
}

export default MapPage;